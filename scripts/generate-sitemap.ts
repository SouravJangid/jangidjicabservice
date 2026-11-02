import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { BLOG_POSTS } from '../src/content/blogData.ts';
import { brandData, imageData, popularRoutes, seoContent, serviceAreas } from '../src/content/data.ts';

const siteUrl = process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL;
const outputDirectory = resolve('dist');
const robotsPath = resolve(outputDirectory, 'robots.txt');
const htmlPath = resolve(outputDirectory, 'index.html');

await mkdir(outputDirectory, { recursive: true });

const escapeHtml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');
const escapeJsonForHtml = (value: unknown) => JSON.stringify(value).replaceAll('<', '\\u003c');
const updateMeta = (html: string, attribute: 'name' | 'property', key: string, value: string) => {
  const tag = new RegExp(`<meta\\s+${attribute}="${key}"[^>]*>`, 'i');
  const replacement = `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`;
  return tag.test(html) ? html.replace(tag, replacement) : html.replace('</head>', `  ${replacement}\n  </head>`);
};

let html = await readFile(htmlPath, 'utf8');
const defaultTitle = seoContent.title;
const defaultDescription = seoContent.description;
const socialImage = imageData.cabAc;
html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(defaultTitle)}</title>`);
html = updateMeta(html, 'name', 'description', defaultDescription);
html = updateMeta(html, 'name', 'author', brandData.name);
html = updateMeta(html, 'name', 'robots', 'index,follow,max-image-preview:large');
html = updateMeta(html, 'property', 'og:title', defaultTitle);
html = updateMeta(html, 'property', 'og:description', defaultDescription);
html = updateMeta(html, 'property', 'og:image', socialImage);
html = updateMeta(html, 'name', 'twitter:title', defaultTitle);
html = updateMeta(html, 'name', 'twitter:description', defaultDescription);
html = updateMeta(html, 'name', 'twitter:image', socialImage);

if (siteUrl) {
  const origin = new URL(siteUrl.startsWith('http') ? siteUrl : `https://${siteUrl}`).origin;
  const canonicalTag = `<link rel="canonical" href="${escapeHtml(origin)}" />`;
  html = /<link\s+rel="canonical"/i.test(html)
    ? html.replace(/<link\s+rel="canonical"[^>]*>/i, canonicalTag)
    : html.replace('</head>', `  ${canonicalTag}\n  </head>`);

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
    '@id': `${origin}/#cab-service`,
    name: brandData.name,
    image: socialImage,
    url: origin,
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
    areaServed: serviceAreas
  };
  const schemaTag = `<script id="site-structured-data" type="application/ld+json">${escapeJsonForHtml(localBusinessSchema)}</script>`;
  const existingSchema = /<script id="site-structured-data"[^>]*>[\s\S]*?<\/script>/i;
  html = existingSchema.test(html)
    ? html.replace(existingSchema, schemaTag)
    : html.replace('</head>', `  ${schemaTag}\n  </head>`);
}

await writeFile(htmlPath, html);

if (!siteUrl) {
  console.warn('Sitemap not generated: set SITE_URL or VERCEL_PROJECT_PRODUCTION_URL.');
  process.exit(0);
}

const origin = new URL(siteUrl.startsWith('http') ? siteUrl : `https://${siteUrl}`).origin;
const paths = [
  '/',
  '/about',
  '/fleet',
  '/services',
  '/routes',
  '/blog',
  '/contact',
  ...popularRoutes.map((route) => `/routes/${route.slug}`),
  ...BLOG_POSTS.map((post) => `/blog/${post.slug}`)
];
const escapeXml = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const urlEntries = paths
  .map((path) => `  <url><loc>${escapeXml(`${origin}${path}`)}</loc></url>`)
  .join('\n');

await writeFile(
  resolve(outputDirectory, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`
);
await writeFile(robotsPath, `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
console.log(`Generated sitemap for ${origin} (${paths.length} URLs).`);
