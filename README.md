# NMIT design 2 — React application

React + TypeScript, Vite, and React Router. The supplied ex.html is the original visual/content reference. The application includes the interactive Three.js hero, ten illustrated engineering guides, a workflow explorer, a topic-filtered homepage reading desk, six FAQs, supplied client logos, and fictional character assets.

## CLI workflow

```sh
npm ci
npm run dev
npm run check
npm run build
```

Local preview: http://localhost:4175/. The build type-checks, bundles, and prerenders the homepage, /blog, and ten full guides. Generated HTML includes article bodies, links, images/alt text, metadata, and BlogPosting/Breadcrumb structured data. dist/ is generated output. npm run preview serves it after the development server has stopped.

BrowserRouter uses clean paths; old /#/ links are converted on load. Vercel article rewrites and Netlify's existing-file-first fallback are included. Other hosts must serve existing HTML/assets first and rewrite remaining application routes to /index.html. Set VITE_SITE_URL before building if the public domain differs from https://nmit-solutions.com; it controls canonical URLs, social images, schema, and sitemap. No deployment is performed by the build.

## Source and assets

- src/pages/: home, services, about, careers, blog/article, and contact views.
- src/components/WorkflowExplorer.tsx: three selectable workflows with explanations, evidence, links, and different transparent character poses.
- src/components/ReadingDesk.tsx: lead feature and numbered guide index, filtered by Architecture, Payments, Operations, or Planning.
- src/components/CharacterGuide.tsx: decorative cutouts and contextual guidance.
- src/components/ClientLogos.tsx: six supplied logos, also grouped by sector on About.
- src/content/: ten full guides and shared article components.
- src/data/posts.ts: typed metadata and retained reference posts.
- src/seo.ts: canonical/social metadata and article schema.
- src/styles.css, src/home.css, src/article.css: theme tokens and responsive layouts.
- src/entry-server.tsx and scripts/prerender-articles.mjs: generated HTML and sitemap.
- public/images/articles/: a cover and two contextual scenes per full guide, in 1536px and 768px WebP variants.
- public/images/characters/: two full character sheets, six pose PNGs, and six alpha WebP website cutouts.
- public/images/client-logos/: Bank Albilad, Indian Bank, Santander Consumer Bank, NSE, Finmet Technologies, and Bupa.

Article scenes include the actual NMIT logo and the sage, teal, amber, graphite, and cream palette. They portray concepts and fictional engineers, not customer results or live vendor interfaces. Inline images sit beside the matching explanation with descriptive alt text and captions. Decorative cutout characters use empty alt because the adjacent text carries the information.

## Routes

Core pages: /, /services, /about, /careers, /blog, /contact. Contact presets: /contact/workshop, /contact/api, /contact/cloud, /contact/devops, /contact/staffing.

Full guides:

- /blog/legacy-system-integration
- /blog/partner-payment-apis
- /blog/erp-crm-integration
- /blog/api-vs-event-driven-vs-batch-integration
- /blog/payment-api-testing-checklist
- /blog/hybrid-cloud-migration-checklist
- /blog/api-integration-project-cost
- /blog/api-integration-monitoring
- /blog/integration-handover-checklist
- /blog/incremental-legacy-modernization

The telecom and hardware reference posts remain at /blog/telecom-cloud-migration and /blog/hp-qualcomm-partnership. The payment guide retains its original URL/publication date and shows its update date. Guides have contextual cluster/service links and related reading. Unknown paths show the not-found view.

The contact form opens a draft in the visitor's email app; there is no enquiry backend. Topic selection changes the subject and contextual character. Theme preference persists locally and defaults to device preference. Characters are fictional brand illustrations, not staff portraits.

## Motion and branding

The hero model loads in a separate lazy bundle. It moves slowly and supports drag, reset, pause, individual system selection, and 3D explainer boards dismissed by button or Escape. The hub name and logo texture are NMIT. Headline words preserve spaces. Reduced motion disables automatic animation; the model pauses offscreen or when the tab is hidden. The original SVG architecture diagram supplies the WebGL fallback. The original public/brand/nmit-concept.png is used throughout the logo system. Cutout characters have short entry/hover transitions and change by context; reduced motion is respected.

## Verification

The production build passes. Static audits checked all ten guide bodies, three article images per guide, descriptive alt text, asset existence, unique IDs, contents targets, and structured data. In-app browser checks covered six new guide routes at 390px width, inline figure loading, desktop/light/dark homepage layouts, filters, workflow switching, characters on the main pages, six logos on Home/About, contact presets, hero text spacing, and Cloud explainer dismissal. No horizontal overflow was observed in these checks.

npm run verify:browser is the optional existing CLI suite using installed Google Chrome. It now lists nineteen routes, with reference comparisons scoped to the two retained short article bodies, excluding their new contextual guidance. It was not rerun during this in-app verification. CHROME_BIN, PREVIEW_URL, and REFERENCE_HTML override defaults. Generated browser artifacts, dist/, .prerender/, and .seo-cache/ are ignored.

The build reports chunks above 500KB for the application and separate Three.js bundle. This is a size warning, not a build failure. Editorial scores are manual assessments, not measured search performance.

## Records

- docs/integration-articles-review.md: coverage/link counts, content score, E-E-A-T, citation readiness, and evidence limits.
- docs/integration-article-images.md: first three expanded/new guides' prompts and assets.
- docs/additional-article-images.md: next six guides' prompts and assets.
- docs/character-assets.md: sheets, poses, alpha extraction, and placement.
- docs/homepage-design.md: direction, themes, contrast, and responsive verification.
- docs/legacy-article-review.md and docs/legacy-article-images.md: original legacy guide.
- docs/hero-design.md and docs/brand-design.md: hero and brand decisions.

reference.json records the original snapshot. Fonts retain the reference Google Fonts URLs and system fallbacks. The site uses React components rather than HTML-string injection.
