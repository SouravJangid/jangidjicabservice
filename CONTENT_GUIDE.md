# Editing Site Content

The editable source of truth is [`src/data/content.json`](src/data/content.json). The website imports this file through typed adapters; `src/content/data.ts` and `src/content/blogData.ts` are compatibility facades, not places to edit content.

## What You Can Change

- `brand`: business name, phone, WhatsApp, address, hours, map URL, and base coordinates.
- `assets`: image URLs or site-relative files such as `/assets/cab-ac.webp`.
- `hero` and `components`: bilingual section titles, descriptions, labels, and rotating hero phrases.
- `fleet`: cab names, model/spec data, AC flag, image key, features, and descriptions.
- `pricing.rates`: per-km/minimum and trip charges. Use `null` when not confirmed; the site displays “Fare on enquiry” instead of a zero price.
- `services`, `routes`, `locations`, `faqs`, `reviews`, and `blogs`: the corresponding cards, autocomplete entries, FAQs, review cards, and blog pages.
- `seo`: default page title, description, and keyword reference.

Each fleet item's `image` points to a key in `assets`; blog records use `coverImageKey` and `authorImageKey`. A blank optional image uses the configured fallback. Asset URLs must be HTTPS or site-relative; `javascript:`, `data:`, protocol-relative URLs, and parent-directory paths are rejected.

Service icon names are mapped by `ServicesSection`. Current supported names include `Navigation`, `Plane`, `Mountain`, `Train`, `MapPin`, and `Sparkles`; unknown values use a safe default icon.

## Adding Records Safely

Keep each record's `id` or `slug` unique. Add any image key to `assets` before referencing it. Keep the existing required fields and data types; optional prices, model year, seats, and route distances may be `null`. The service validates required arrays, unique IDs/slugs, review ratings from 1 to 5, image references, and maximum list sizes during startup/build.

Article HTML in `contentHtml` and `contentHtml_hi` is sanitized before rendering. Basic headings, paragraphs, lists, emphasis, links, and IDs are allowed; scripts and inline event handlers are removed.

## Content API

The read-only JSON endpoints are:

- `GET /api/content` lists available domains.
- `GET /api/content/brand`
- `GET /api/content/assets`
- `GET /api/content/fleet`
- `GET /api/content/pricing`
- `GET /api/content/services`
- `GET /api/content/routes`
- `GET /api/content/locations`
- `GET /api/content/reviews`
- `GET /api/content/faqs`
- `GET /api/content/blogs`

The API is read-only by design. Edit the JSON in source control and redeploy; no public endpoint can write site content or files. Responses are cached briefly and domains are allowlisted.

## Build and Sitemap

Run `npm run lint` and `npm run build` after edits. Set `SITE_URL` in the deployment environment to the canonical production origin, for example `https://yourdomain.com`; the build then generates `sitemap.xml` and updates `robots.txt` with its URL. The sitemap includes the static pages and all route/blog slugs from the JSON catalog.
