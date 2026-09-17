# Homepage design and verification

## Three directions

1. Service cards and moving client logos. Rejected: a generic agency arrangement with equal weight for unrelated services.
2. An integration workbench: choose payments, customer data, or cloud transition and inspect the boundary, ownership, and acceptance evidence.
3. An engineering reading desk: one lead article beside a numbered index, with filters for the decision or operating responsibility in front of the reader.

The implementation combines directions 2 and 3. A four-step delivery sequence connects discovery, contracts, failure validation, and handover. Six visible FAQs sit in the project-planning content. The existing 3D architecture stays the hero focal point; the reading index has deliberate unequal feature/list hierarchy rather than repeated identical cards.

## Tokens

IBM Plex Sans keeps the reference's practical body/headline voice. IBM Plex Mono labels indices, categories, and controls. The existing 1120px reading width and 3–4px radii keep the reference structure. Light: sage #EEF0E9, panel #E3E6DA, graphite #1B211E, muted #565C51, teal #276057, deeper amber text #8C530B. Source illustration amber remains #A5650F. Dark: #14181A/#1B2023 surfaces, #E8E6DC ink, #A6AA9C muted ink, #57B0A4 teal, #E3A24C amber. The two palettes use separately tuned accents.

Calculated contrast on the light panel: ink 12.94:1, muted 5.45:1, teal 5.73:1, amber text 4.94:1. All four roles exceed 4.5:1 on the light background and the two dark surfaces. Existing hero amber #92590D reaches 4.54:1 on the light panel. Selected workflow/filter controls use the contrasting surface color against teal.

Client logos preserve full color on neutral light plates in either theme. They stay static with organization labels. Finmet's supplied image has generous padding, handled through a sized plate. Article illustrations retain their light scene backgrounds; characters have actual alpha and sit directly on the site surface.

## Behavior and design checks

- Workflow buttons update heading, problem, choices, evidence, link, and character pose. aria-pressed communicates selection.
- Reading filters expose ten guides: Architecture 4, Payments 2, Operations 2, Planning 2. Each view has one lead image and an indexed related list.
- FAQs remain visible near the relevant planning content, with guide/workshop links.
- Home and About show the six supplied client logos; About retains sector groups.
- Characters change by workflow, article topic, and contact subject. Home, Services, About, Careers, Blog, and Contact also have contextual characters.
- Short entry/hover movement respects reduced motion. No new logo marquee, carousel, blurred gradient background, generic feature-card grid, or looping character movement.

Arrows were removed from workflow, delivery, and character guidance links; the reading index retains a compact diagonal link indicator. Eyebrows are mixed-case technical labels, not tracked uppercase slogans. Existing business figures and client names are preserved without invented new results, endorsements, or support commitments.

## Verification

The production build and static homepage/article HTML audit passed. In-app checks exercised all workflow choices, all reading filters, six FAQs, six client logos, and the main-page characters. Contact DevOps/cloud/API presets showed their intended poses. Desktop and 390×844 mobile layouts were checked in light/dark themes. No horizontal overflow was found in the checked views. PNG and WebP assets contain RGBA alpha; cutout rendering was inspected on actual site backgrounds.

The six newest guides were checked at mobile width for one H1, three article figures, valid contents targets, and overflow. Handover and monitoring contextual figure placement was visually inspected. The hero remained ready with nine labels, correctly spaced complete text, and a Cloud board that dismissed with Escape. Temporary viewport overrides are reset before finishing. The optional CLI suite was updated but not run. Production deployment, indexing, analytics, and measured search performance are outside these local checks.
