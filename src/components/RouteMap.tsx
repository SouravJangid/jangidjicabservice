import React from 'react';
import { MapPin, Navigation, Compass, AlertCircle } from 'lucide-react';

interface RouteMapProps {
  origin: string;
  destination: string;
  km: number;
  duration: string;
  routePoints?: [number, number][];
  coordinates?: {
    origin: [number, number];
    dest: [number, number];
  };
}

export const RouteMap: React.FC<RouteMapProps> = ({
  origin,
  destination,
  km,
  duration,
  routePoints = [],
  coordinates
}) => {
  const originCoord = coordinates?.origin || [28.8333, 77.5833];
  const destCoord = coordinates?.dest || [29.9457, 78.1642];

  // SVG viewBox projection
  // Normalize latitudes and longitudes to an SVG coordinate space (800 x 420)
  const lats = [originCoord[0], destCoord[0], ...(routePoints.map(p => p[0]))];
  const lngs = [originCoord[1], destCoord[1], ...(routePoints.map(p => p[1]))];

  const minLat = Math.min(...lats) - 0.15;
  const maxLat = Math.max(...lats) + 0.15;
  const minLng = Math.min(...lngs) - 0.2;
  const maxLng = Math.max(...lngs) + 0.2;

  const latSpan = Math.max(maxLat - minLat, 0.4);
  const lngSpan = Math.max(maxLng - minLng, 0.4);

  const project = (lat: number, lng: number) => {
    // Mercator-like 2D projection
    const x = ((lng - minLng) / lngSpan) * 720 + 40;
    // Invert Y axis because SVG y increases downwards
    const y = ((maxLat - lat) / latSpan) * 340 + 40;
    return { x, y };
  };

  const startPt = project(originCoord[0], originCoord[1]);
  const endPt = project(destCoord[0], destCoord[1]);

  let pathString = '';
  if (routePoints.length > 2) {
    pathString = routePoints
      .map((p, idx) => {
        const pt = project(p[0], p[1]);
        return `${idx === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
      })
      .join(' ');
  } else {
    // Curved bezier fallback
    const midX = (startPt.x + endPt.x) / 2 + (endPt.y - startPt.y) * 0.12;
    const midY = (startPt.y + endPt.y) / 2 - (endPt.x - startPt.x) * 0.12;
    pathString = `M ${startPt.x} ${startPt.y} Q ${midX} ${midY} ${endPt.x} ${endPt.y}`;
  }

  return (
    <div className="relative w-full h-[320px] md:h-[400px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl flex flex-col justify-between">
      {/* Map Header / Stats Banner */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700/80 shadow-lg flex items-center gap-2">
          <Navigation className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-semibold text-white">
            {origin} <span className="text-slate-400">➔</span> {destination}
          </span>
        </div>

        <div className="bg-amber-400 text-slate-950 px-3 py-1.5 rounded-xl font-bold text-xs shadow-lg flex items-center gap-1.5">
          <span>{km} km</span>
          <span className="w-1 h-1 rounded-full bg-slate-900" />
          <span>{duration}</span>
        </div>
      </div>

      {/* Stylized Dark Highway Map Grid Canvas */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 800 420"
          className="w-full h-full object-contain"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Grid pattern */}
            <pattern id="roadGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.8" opacity="0.6" />
            </pattern>

            {/* Glowing route gradient */}
            <linearGradient id="routeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#16A34A" />
              <stop offset="50%" stopColor="#FFC107" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background grid */}
          <rect width="800" height="420" fill="#090d16" />
          <rect width="800" height="420" fill="url(#roadGrid)" />

          {/* Reference highways (Delhi-Meerut Expressway / NH-58 stylized context lines) */}
          <path d="M 120 380 Q 400 240 680 80" stroke="#1e293b" strokeWidth="6" fill="none" strokeDasharray="6 4" opacity="0.4" />
          <path d="M 180 400 Q 420 280 720 120" stroke="#1e293b" strokeWidth="4" fill="none" opacity="0.3" />

          {/* Outer glow of the calculated route */}
          <path
            d={pathString}
            fill="none"
            stroke="url(#routeGlow)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.35"
            filter="url(#glow)"
          />

          {/* Solid core road line */}
          <path
            d={pathString}
            fill="none"
            stroke="url(#routeGlow)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Animated highway dash flow */}
          <path
            d={pathString}
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeDasharray="8 8"
            strokeLinecap="round"
            opacity="0.9"
            className="animate-pulse"
          />

          {/* Origin Marker (Green) */}
          <g transform={`translate(${startPt.x}, ${startPt.y})`}>
            <circle r="14" fill="#16a34a" fillOpacity="0.25" className="animate-ping" />
            <circle r="8" fill="#16a34a" stroke="#ffffff" strokeWidth="2.5" />
            <text
              y="-14"
              textAnchor="middle"
              fill="#86efac"
              fontSize="12"
              fontWeight="bold"
              style={{ textShadow: '0 2px 4px #000' }}
            >
              PICKUP: {origin.split('(')[0].trim()}
            </text>
          </g>

          {/* Destination Marker (Amber/Blue) */}
          <g transform={`translate(${endPt.x}, ${endPt.y})`}>
            <circle r="14" fill="#2563eb" fillOpacity="0.25" className="animate-ping" />
            <circle r="8" fill="#ffc107" stroke="#ffffff" strokeWidth="2.5" />
            <text
              y="24"
              textAnchor="middle"
              fill="#fde047"
              fontSize="12"
              fontWeight="bold"
              style={{ textShadow: '0 2px 4px #000' }}
            >
              DROP: {destination.split('(')[0].trim()}
            </text>
          </g>
        </svg>
      </div>

      {/* Map Bottom Bar Notice */}
      <div className="absolute bottom-2 left-3 right-3 z-10 flex items-center justify-between text-[11px] text-slate-400 bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-lg border border-slate-800">
        <span className="flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          Real highway road route via NH-58 / DME
        </span>
        <span className="text-amber-400/90 font-medium">Tolls & parking extra at actuals</span>
      </div>
    </div>
  );
};
