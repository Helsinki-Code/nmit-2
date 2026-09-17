# NMIT fictional character asset record

Mode: built-in image_gen. The existing article cover provided identity/style references. Separate model sheets were generated first, inspected, and then used as references for six standalone poses. An additional background-extraction edit preserved each design while requesting a precise alpha cutout. PNG originals in public/images/characters remain available for reuse; website cutouts are 360×540 WebP with alpha preserved, quality 85. All assets are fictional illustrations, not staff portraits. Decorative website characters use empty alt attributes because the adjoining text supplies the information; article illustrations have descriptive contextual alt text.

## Website use

- Homepage workflow selector: thoughtful woman for payments, explaining woman for customer data, runbook man for cloud transition. Selecting a workflow updates its explanation, evidence, link, and character.
- Contact: character changes with enquiry subject (planning, investigation, or runbook).
- Services: explaining woman. About and Careers: welcoming man. Blog: investigating man.
- Article sidebars: pose follows the article topic; hidden on narrow screens to keep the contents compact.
- Homepage final enquiry: planning woman.

Subtle entry/hover movement respects reduced-motion settings. Characters are loaded lazily with reserved dimensions. Two character sheets include three full-body views and four expression studies per character.

## Model sheet: woman

Final: public/images/characters/sheet-woman.png

Generation prompt:
```text
Use case: illustration-story. Generate a separate professional character model sheet of ONLY the fictional woman from the reference image, preserve identity, clothing and restrained flat illustration style. Brown-skinned woman, shoulder-length dark bob, teal #276057 overshirt, amber #A5650F T-shirt, cream wide-leg trousers, cream sneakers. Landscape 1536x1024. Arrange three full-body views front, side and back, then four expressive head studies: thoughtful, focused, welcoming, explaining. Consistent proportions, complete limbs, crisp graphite outlines. This is a reusable brand character reference sheet, no other characters. Background must be genuinely transparent with an alpha channel, no white or colored backdrop, no checkerboard drawn into the image, no shadows, no scenery, no captions or labels. Keep every figure separated with transparent space.
```

## Model sheet: man

Final: public/images/characters/sheet-man.png

Generation prompt:
```text
Use case: illustration-story. Generate a separate professional character model sheet of ONLY the fictional man from the reference image, preserve identity, clothing and restrained flat illustration style. Man with dark curly hair, round glasses, cream collared shirt, teal #276057 trousers, dark shoes. Landscape 1536x1024. Arrange three full-body views front, side and back, then four expressive head studies: thoughtful, focused, welcoming, explaining. Consistent proportions, complete limbs, crisp graphite outlines. This is a reusable brand character reference sheet, no other characters. Background must be genuinely transparent with an alpha channel, no white or colored backdrop, no checkerboard drawn into the image, no shadows, no scenery, no captions or labels. Keep every figure separated with transparent space.
```

## Pose: woman-explain

Final: public/images/characters/woman-explain.png and woman-explain.webp

Reference: woman model sheet.

Generation prompt:
```text
Use case illustration-story. Reusable transparent website character cutout. The input is a model sheet reference, generate ONLY ONE full-body pose of its woman, do not reproduce the sheet. Preserve face, haircut, skin tone, glasses when present, clothes, proportions and flat graphite outlines exactly. Standing relaxed, one open hand gesturing to her left as she explains an integration boundary; engaged expression. Brand palette teal #276057 amber #A5650F cream graphite. Portrait canvas, character fully visible head to shoes, centered with tight but safe transparent margins. Genuinely transparent RGBA alpha background with all empty space alpha zero. No white/colored/black background, no ground plane, no gradient, NO shadow or glow or halo, no scene, no floating icons, no labels, no other characters. Clean isolated edges; keep solid character opaque.
```

## Pose: woman-plan

Final: public/images/characters/woman-plan.png and woman-plan.webp

Reference: woman model sheet.

Generation prompt:
```text
Use case illustration-story. Reusable transparent website character cutout. The input is a model sheet reference, generate ONLY ONE full-body pose of its woman, do not reproduce the sheet. Preserve face, haircut, skin tone, glasses when present, clothes, proportions and flat graphite outlines exactly. Standing holding a clipboard against her chest, looking down thoughtfully while touching one checklist item; focused planning expression. Brand palette teal #276057 amber #A5650F cream graphite. Portrait canvas, character fully visible head to shoes, centered with tight but safe transparent margins. Genuinely transparent RGBA alpha background with all empty space alpha zero. No white/colored/black background, no ground plane, no gradient, NO shadow or glow or halo, no scene, no floating icons, no labels, no other characters. Clean isolated edges; keep solid character opaque.
```

## Pose: woman-review

Final: public/images/characters/woman-review.png and woman-review.webp

Reference: woman model sheet.

Generation prompt:
```text
Use case illustration-story. Reusable transparent website character cutout. The input is a model sheet reference, generate ONLY ONE full-body pose of its woman, do not reproduce the sheet. Preserve face, haircut, skin tone, glasses when present, clothes, proportions and flat graphite outlines exactly. Standing thoughtfully, hand at chin, other arm folded; evaluating a tricky decision with an attentive expression. Brand palette teal #276057 amber #A5650F cream graphite. Portrait canvas, character fully visible head to shoes, centered with tight but safe transparent margins. Genuinely transparent RGBA alpha background with all empty space alpha zero. No white/colored/black background, no ground plane, no gradient, NO shadow or glow or halo, no scene, no floating icons, no labels, no other characters. Clean isolated edges; keep solid character opaque.
```

## Pose: man-investigate

Final: public/images/characters/man-investigate.png and man-investigate.webp

Reference: man model sheet.

Generation prompt:
```text
Use case illustration-story. Reusable transparent website character cutout. The input is a model sheet reference, generate ONLY ONE full-body pose of its man, do not reproduce the sheet. Preserve face, haircut, skin tone, glasses when present, clothes, proportions and flat graphite outlines exactly. Standing studying a small open notebook, index finger following a line; focused investigative expression. Brand palette teal #276057 amber #A5650F cream graphite. Portrait canvas, character fully visible head to shoes, centered with tight but safe transparent margins. Genuinely transparent RGBA alpha background with all empty space alpha zero. No white/colored/black background, no ground plane, no gradient, NO shadow or glow or halo, no scene, no floating icons, no labels, no other characters. Clean isolated edges; keep solid character opaque.
```

## Pose: man-welcome

Final: public/images/characters/man-welcome.png and man-welcome.webp

Reference: man model sheet.

Generation prompt:
```text
Use case illustration-story. Reusable transparent website character cutout. The input is a model sheet reference, generate ONLY ONE full-body pose of its man, do not reproduce the sheet. Preserve face, haircut, skin tone, glasses when present, clothes, proportions and flat graphite outlines exactly. Standing with one hand raised in a small welcoming wave, other hand relaxed; friendly professional smile. Brand palette teal #276057 amber #A5650F cream graphite. Portrait canvas, character fully visible head to shoes, centered with tight but safe transparent margins. Genuinely transparent RGBA alpha background with all empty space alpha zero. No white/colored/black background, no ground plane, no gradient, NO shadow or glow or halo, no scene, no floating icons, no labels, no other characters. Clean isolated edges; keep solid character opaque.
```

## Pose: man-runbook

Final: public/images/characters/man-runbook.png and man-runbook.webp

Reference: man model sheet.

Generation prompt:
```text
Use case illustration-story. Reusable transparent website character cutout. The input is a model sheet reference, generate ONLY ONE full-body pose of its man, do not reproduce the sheet. Preserve face, haircut, skin tone, glasses when present, clothes, proportions and flat graphite outlines exactly. Standing holding a single teal runbook open and pointing to it; explaining a recovery step, calm confident expression. Brand palette teal #276057 amber #A5650F cream graphite. Portrait canvas, character fully visible head to shoes, centered with tight but safe transparent margins. Genuinely transparent RGBA alpha background with all empty space alpha zero. No white/colored/black background, no ground plane, no gradient, NO shadow or glow or halo, no scene, no floating icons, no labels, no other characters. Clean isolated edges; keep solid character opaque.
```

## Alpha extraction edit, applied separately to all eight assets

```text
Use case background-extraction. Edit this exact supplied character illustration. Preserve all character figures, faces, clothing, pose, linework, objects held in their hands, scale and canvas dimensions. REMOVE the entire surrounding soft colored haze/halo and every shadow or gradient. Output a precise clean isolated cutout on actual alpha transparency: every pixel outside the drawn characters/held objects is fully transparent alpha 0, every solid interior is fully opaque alpha 255 except clean antialiased edges. No background color, no checkerboard painted, no soft masks fading across the characters. Do not redraw or change the characters. This is background removal only for professional reusable website PNG cutouts.
```

Pixel verification: PNG and WebP assets are RGBA with alpha range 0–254, transparent corner pixels, and essentially opaque character interiors. The generator preview displays RGB color under alpha-zero pixels as a dark haze; those pixels are transparent in the website. Browser presentation was checked on the actual page backgrounds.

