import { pricingConfig } from '../content/data';

export interface FareCalculationInput {
  distanceKm: number;
  carId: string;
  tripType: 'oneway' | 'round';
  days?: number;
  isNight?: boolean;
}

export interface FareBreakdown {
  baseFare: number;
  billableKm: number;
  ratePerKm: number;
  minimumFare: number;
  driverAllowance: number;
  nightCharge: number;
  totalFare: number;
  currency: string;
}

export function calculateFare(input: FareCalculationInput): FareBreakdown {
  const { distanceKm, carId, tripType, days = 1, isNight = false } = input;
  const carRates = pricingConfig.rates[carId] ?? pricingConfig.rates[Object.keys(pricingConfig.rates)[0]];
  if (!carRates) throw new Error('No vehicle pricing rates are configured.');
  const ratePerKm = carRates.perKm;
  const minimumFare = carRates.minFare;

  let billableKm = 0;
  let baseFare = 0;
  let driverAllowance = 0;

  if (tripType === 'oneway') {
    billableKm = Math.max(distanceKm, 20); // standard minimum 20 km for one-way
    const calculated = distanceKm * ratePerKm;
    baseFare = Math.max(calculated, minimumFare);
  } else {
    // Round trip: double distance or daily min km
    const roundDistance = distanceKm * 2;
    const minRequiredKm = carRates.minKmPerDay * days;
    billableKm = Math.max(roundDistance, minRequiredKm);
    baseFare = billableKm * ratePerKm;
    
    if (days > 1) {
      driverAllowance = (days - 1) * carRates.driverAllowancePerNight;
    }
  }

  const nightCharge = (isNight && pricingConfig.nightCharge.enabled) ? pricingConfig.nightCharge.amount : 0;
  const totalFare = Math.round(baseFare + driverAllowance + nightCharge);

  return {
    baseFare: Math.round(baseFare),
    billableKm: Math.round(billableKm * 10) / 10,
    ratePerKm,
    minimumFare,
    driverAllowance,
    nightCharge,
    totalFare,
    currency: pricingConfig.currency
  };
}
