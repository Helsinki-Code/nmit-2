# NMIT design 2 — React application

A React + TypeScript application built with Vite and React Router. The supplied `ex.html` is the visual and content reference, not the application implementation. The reference typography, palette, and original pages remain, alongside an interactive Three.js hero and a new illustrated integration guide.

## CLI workflow

```sh
npm ci
npm run dev
npm run check
npm run build
```

Development preview: http://localhost:4175/. `npm run preview` serves the production build on the same port after the development process has stopped. Upload `dist/` to a host configured for domain-root deployment. BrowserRouter uses clean paths; old `/#/...` links are converted on load. Vercel rewrites and a Netlify `_redirects` fallback are included. Other hosts must serve existing article files first and rewrite remaining application paths to `/index.html`. Assets use root-relative paths.

The build prerenders `/blog/legacy-system-integration` and `/blog` into HTML, including article content, normal links, and article metadata. `dist/` remains a generated build output. Set `VITE_SITE_URL` before building if the production domain differs from `https://nmit-solutions.com`; it controls canonical URLs, social images, structured data, and the sitemap.

## Source structure

- `src/App.tsx`: route composition and scroll restoration.
- `src/seo.ts`: canonical URLs, descriptions, social metadata, and article structured data.
- `src/components/`: reusable header, footer, integration diagram, workshop, service rows, statistics, and blog previews.
- `src/pages/`: React home, services, about, careers, blog index/article, and contact pages.
- `src/data/posts.ts`: typed article data from the reference.
- `src/content/LegacySystemIntegration.tsx`: full article, source links, contents, and contextual illustrations.
- `src/styles.css` and `src/article.css`: reference styles and the responsive article layout.
- `src/entry-server.tsx` and `scripts/prerender-articles.mjs`: React article and blog-listing prerendering.
- `index.html`: Vite document shell.

There is no HTML-string page rendering, injected legacy script, or `dangerouslySetInnerHTML`. React state controls the theme, navigation menu, and enquiry topic. Forms use React events and FormData. The email action opens a draft in the visitor's email application, as in the reference; there is no enquiry backend.

## Routes

`/`, `/services`, `/about`, `/careers`, `/blog`, `/blog/legacy-system-integration`, `/blog/telecom-cloud-migration`, `/blog/partner-payment-apis`, `/blog/hp-qualcomm-partnership`, `/contact`, `/contact/api`, and `/contact/workshop`.

The three original blog pages preserve the reference's content and dates. The new guide has three original brand illustrations, responsive WebP assets, descriptive alt text, and seven primary technical references. The workshop and API contact routes select their respective enquiry options. Unknown routes retain the reference's not-found view. Theme preference persists using local storage and defaults to the device preference.

## Verification

`npm run check` type-checks the application. `npm run build` type-checks, builds, and prerenders the illustrated guide. The existing `npm run verify:browser` CLI checks eleven rendered routes, theme persistence, mobile navigation, workshop selection, and form validation using installed Google Chrome. It captures light/dark desktop and mobile screenshots. When the reference is available at `../website-review/ex.html` (or `REFERENCE_HTML`), it compares eight unchanged views, allowing the intended NMIT title branding. Home, blog listing, and the new article are excluded from reference comparisons. The hero checks cover 3D rendering, system selection, camera drag/reset, pause/play, reduced motion, and WebGL fallback. Set `CHROME_BIN` or `PREVIEW_URL` to override local defaults. Browser artifacts are ignored by Git.

The new article was verified with the in-app browser at desktop and 390px mobile widths, including contextual image loading, contents anchors, the API enquiry preset, metadata cleanup, and page overflow. The build HTML was checked for full article text, images/alt attributes, source links, structured data, and a crawlable listing link. See `docs/legacy-article-review.md` for editorial limitations and `docs/legacy-article-images.md` for image prompts and final assets.

`reference.json` identifies the original reference snapshot. It is retained for provenance; the React implementation is intentionally a component-based recreation, not a byte-identical HTML copy. Fonts retain the original Google Fonts URLs and system fallbacks.

## Interactive hero

The home route loads the Three.js model in a separate lazy-loaded bundle. The architecture slowly rocks and floats. Drag to rotate it; click a module, label, or system selector to open that system’s own 3D explainer board. Each board includes its role, two integration steps, and its connection flow; close it with its button or Escape. Reset restores the initial camera. Pause stops the model, data flow, and headline sequences. All headline words retain explicit spaces during animation. Reduced-motion preference disables automatic movement, and rendering pauses when the hero is offscreen or the tab is hidden. If WebGL is unavailable, the original SVG diagram remains available. No external 3D assets or simulated business metrics are used.

See `docs/hero-design.md` for the design direction and theme decisions.

## Brand assets

`src/components/BrandLogo.tsx` provides the NMIT integration-bridge mark and wordmark used in the shared header and footer. The original `public/brand/nmit-concept.png` is used directly in the header, footer, favicon, fallback diagram, and as a texture at the center of the 3D hub. The hub is named NMIT. The image remains unchanged in both themes; `docs/brand-design.md` records the concept and palette.
