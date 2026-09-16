# NMIT design 2 — React application

A React + TypeScript application built with Vite and React Router. The supplied `ex.html` is the visual and content reference, not the application implementation. The original content, typography, palette, and page layouts are preserved outside the updated hero. The hero now uses a Three.js integration workbench and a full-message animated headline.

## CLI workflow

```sh
npm ci
npm run dev
npm run check
npm run build
```

Development preview: http://localhost:4175/. `npm run preview` serves the production build on the same port after the development process has stopped. Upload `dist/` to a static web host. HashRouter navigation supports static hosting without rewrite rules; the relative Vite asset base supports deployment under a subdirectory.

## Source structure

- `src/App.tsx`: route composition, document titles, and scroll restoration.
- `src/components/`: reusable header, footer, integration diagram, workshop, service rows, statistics, and blog previews.
- `src/pages/`: React home, services, about, careers, blog index/article, and contact pages.
- `src/data/posts.ts`: typed article data from the reference.
- `src/styles.css`: original reference stylesheet.
- `index.html`: Vite document shell; all UI is rendered by React.

There is no HTML-string page rendering, injected legacy script, or `dangerouslySetInnerHTML`. React state controls the theme, navigation menu, and enquiry topic. Forms use React events and FormData. The email action opens a draft in the visitor's email application, as in the reference; there is no enquiry backend.

## Routes

`/#/`, `/#/services`, `/#/about`, `/#/careers`, `/#/blog`, `/#/blog/telecom-cloud-migration`, `/#/blog/partner-payment-apis`, `/#/blog/hp-qualcomm-partnership`, `/#/contact`, and `/#/contact/workshop`.

The three blog pages preserve the reference's content and dates. The workshop route selects the workshop enquiry option. Unknown routes retain the reference's not-found view. Theme preference persists using local storage and defaults to the device preference.

## Verification

`npm run check` type-checks the application. `npm run build` type-checks and produces the optimized deployment. With the preview running, `npm run verify:browser` uses Playwright with installed Google Chrome headlessly to verify ten rendered views, theme persistence, mobile navigation, workshop selection, and form validation. It captures light/dark desktop and mobile screenshots. When the original reference is available at `../website-review/ex.html` (or `REFERENCE_HTML`), it also compares the nine unchanged views against the reference. The updated hero is checked for 3D rendering, system selection, camera drag/reset, pause/play, reduced motion, and WebGL fallback. Set `CHROME_BIN` or `PREVIEW_URL` to override local defaults. Browser artifacts are ignored by Git.

`reference.json` identifies the original reference snapshot. It is retained for provenance; the React implementation is intentionally a component-based recreation, not a byte-identical HTML copy. Fonts retain the original Google Fonts URLs and system fallbacks.

## Interactive hero

The home route loads the Three.js model in a separate lazy-loaded bundle. The architecture slowly rocks and floats. Drag to rotate it; click a module, label, or system selector to open that system’s own 3D explainer board. Each board includes its role, two integration steps, and its connection flow; close it with its button or Escape. Reset restores the initial camera. Pause stops the model, data flow, and headline sequences. All headline words retain explicit spaces during animation. Reduced-motion preference disables automatic movement, and rendering pauses when the hero is offscreen or the tab is hidden. If WebGL is unavailable, the original SVG diagram remains available. No external 3D assets or simulated business metrics are used.

See `docs/hero-design.md` for the design direction and theme decisions.

## Brand assets

`src/components/BrandLogo.tsx` provides the NMIT integration-bridge mark and wordmark used in the shared header and footer. The original `public/brand/nmit-concept.png` is used directly in the header, footer, favicon, fallback diagram, and as a texture at the center of the 3D hub. The hub is named NMIT. The image remains unchanged in both themes; `docs/brand-design.md` records the concept and palette.
