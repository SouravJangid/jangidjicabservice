import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BLOG_POSTS } from '../content/blogData';
import { brandData, faqData, imageData, popularRoutes, seoContent, servicesData } from '../content/data';

interface SeoHeadProps {
  lang: 'en' | 'hi';
}

const serviceAreas = [
  'Modinagar', 'Muradnagar', 'Raj Nagar', 'Ghaziabad', 'Delhi', 'Noida',
  'Greater Noida', 'Gurugram', 'Haryana', 'Punjab', 'Chandigarh', 'Meerut',
  'Saharanpur', 'Haridwar', 'Rishikesh'
];

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function setCanonical(url: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }
  element.href = url;
}

export function SeoHead({ lang }: SeoHeadProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    const routeSlug = pathname.match(/^\/routes\/([^/]+)$/)?.[1];
    const blogSlug = pathname.match(/^\/blog\/([^/]+)$/)?.[1];
    const route = popularRoutes.find((item) => item.slug === routeSlug);
    const post = BLOG_POSTS.find((item) => item.slug === blogSlug);
    const siteName = brandData.name;
    let title = seoContent.title;
    let description = seoContent.description;

    if (pathname === '/services') {
      title = `Cab Services in Modinagar | ${siteName}`;
      description = 'Enquire about AC and Non-AC cabs for local and outstation travel, with one-way and round-trip booking options.';
    } else if (pathname === '/routes') {
      title = `Popular Cab Routes from Modinagar | ${siteName}`;
      description = 'Browse popular routes from Modinagar, Ghaziabad, Delhi, Noida, Meerut, Haridwar, Rishikesh, and nearby service areas.';
    } else if (pathname === '/fleet') {
      title = `AC & Non-AC Cab Options | ${siteName}`;
      description = 'Compare AC and Non-AC cab service for local and outstation travel. Contact us to confirm fares and availability.';
    } else if (pathname === '/about') {
      title = `About ${siteName} | Modinagar Cab Service`;
      description = 'Learn about Jangid Ji Cab Service in Modinagar, its service areas, trip options, booking method, and applicable taxes.';
    } else if (pathname === '/contact') {
      title = `Contact ${siteName} | Call or WhatsApp`;
      description = `Contact ${siteName} at ${brandData.phoneDisplay} to enquire about cab availability and fares.`;
    } else if (pathname === '/blog') {
      title = `Cab Service & Route Information | ${siteName}`;
      description = 'Read information about cab types, popular service routes, booking, fare confirmation, and applicable taxes.';
    } else if (route) {
      title = `${lang === 'hi' ? route.title_hi : route.title} Cab Service | ${siteName}`;
      description = lang === 'hi' ? route.intro_hi : route.intro;
    } else if (post) {
      title = `${lang === 'hi' ? post.title_hi : post.title} | ${siteName}`;
      description = lang === 'hi' ? post.excerpt_hi : post.excerpt;
    }

    const canonicalUrl = `${window.location.origin}${pathname}`;
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', 'index,follow,max-image-preview:large');
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:type', post ? 'article' : 'website');
    setMeta('property', 'og:site_name', siteName);
    const socialImage = post?.coverImage || imageData.cabAc;
    setMeta('property', 'og:image', socialImage);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', socialImage);
    setCanonical(canonicalUrl);

    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'TaxiService',
          '@id': `${window.location.origin}/#cab-service`,
          name: siteName,
          url: window.location.origin,
          telephone: brandData.phone,
          address: {
            '@type': 'PostalAddress',
            addressLocality: brandData.baseCity,
            addressRegion: brandData.state,
            addressCountry: brandData.country
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: brandData.baseLocation.lat,
            longitude: brandData.baseLocation.lng
          },
          areaServed: serviceAreas,
          serviceType: ['AC cab service', 'Non-AC cab service', 'Local cab service', 'Outstation cab service'],
          makesOffer: servicesData.map((service) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: lang === 'hi' ? service.title_hi : service.title }
          }))
        },
        ...(pathname === '/' ? [{
          '@type': 'FAQPage',
          mainEntity: faqData.map((item) => ({
            '@type': 'Question',
            name: lang === 'hi' ? item.q_hi : item.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: lang === 'hi' ? item.a_hi : item.a
            }
          }))
        }] : [])
      ]
    };

    let schemaElement = document.getElementById('site-structured-data');
    if (!schemaElement) {
      schemaElement = document.createElement('script');
      schemaElement.id = 'site-structured-data';
      schemaElement.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schemaElement);
    }
    schemaElement.textContent = JSON.stringify(schema);
  }, [lang, pathname]);

  return null;
}
