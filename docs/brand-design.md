# NMIT identity

NMIT connects ERP, CRM, payment, mobile and cloud systems. The mark is an integration bridge: two separate rails joined by a deliberately interrupted diagonal. The resulting N silhouette remains clear at small sizes. Its narrow separations relate to the hero's independent modules; the offset right rail introduces deliberate asymmetry.

Directions considered:
1. A cloud with circuit nodes. Discarded because it is a common infrastructure logo with little connection to this company's integration work.
2. An architectural N made from independent rails and a joining bridge.
3. A compact routed interface mark, paired with technical type.

The chosen direction combines the second and third. The wordmark uses the site's IBM Plex family, with NMIT as the primary name and solutions as a quieter descriptor. No slogans or invented credentials.

Light: deep teal #276057, amber #A5650F, graphite #1B211E, sage #EEF0E9.
Dark: muted teal #57B0A4, warm amber #E3A24C, pale graphite #E8E6DC, background #14181A.

The logo is vector-native, with transparent backgrounds and no gradients, shadows, or decorative effects. Standalone marks and wordmarks are provided for both environments. The favicon uses the same silhouette on a sage plate so it remains recognizable in browser chrome. The React component shares its path geometry with the exported mark.

A built-in image-generation concept was used to explore the silhouette (`public/brand/nmit-concept.png`). The production assets are a flat SVG interpretation with exact palette colors; this avoids raster texture and scales to small UI placements.

Concept prompt: a professional minimalist N monogram with two separate teal rails joined by an amber diagonal bridge, reflecting NMIT’s ERP/CRM/payment/cloud integration work, transparent background, no typography, gradients, glow, or mockup.

Files: `nmit-mark-light.svg`, `nmit-mark-dark.svg`, `nmit-logo-light.svg`, `nmit-logo-dark.svg`, `favicon.svg`. Exported wordmarks use IBM Plex with system fallbacks; website wordmarks use the site’s loaded IBM Plex fonts.

## Current production identity

The user selected the original `public/brand/nmit-concept.png` as the authoritative logo. All website branding now uses that exact PNG; the SVG interpretations are not referenced. Header and footer use the image with an NMIT wordmark. The favicon uses the same PNG. The 3D hub uses it as a real WebGL texture on its central top surface, with a sage plate for legibility, and is labeled NMIT. The SVG architecture fallback embeds the original PNG instead of logo paths.
