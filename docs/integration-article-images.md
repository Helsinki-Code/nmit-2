# Integration article images

Generated with the built-in image_gen tool. All nine illustrations use NMIT’s sage, teal, amber, and graphite palette, the actual NMIT logo reference, and the same two fictional engineers. No vendor website or tool interface is depicted.

Each article has one featured cover and two contextual content illustrations. Both 1536 × 1024 and 768 × 512 WebP versions are saved in the project. Content images load lazily and have descriptive alt text and explanatory captions.

## Placement and saved assets

- Payment guide: after the six-step lost-response worked example. `public/images/articles/payment-api-integration/timeout-recovery-{1536,768}.webp`
- Payment guide: after the reconciliation exception and financial ownership explanation. `public/images/articles/payment-api-integration/reconciliation-{1536,768}.webp`
- ERP–CRM guide: at the end of the field-ownership section, after its table. `public/images/articles/erp-crm-integration/field-ownership-{1536,768}.webp`
- ERP–CRM guide: at the end of failed-sync classification and recovery. `public/images/articles/erp-crm-integration/sync-exceptions-{1536,768}.webp`
- Patterns guide: before the four-step hybrid order worked example. `public/images/articles/api-event-batch-integration/hybrid-order-{1536,768}.webp`
- Patterns guide: after ordering, duplicate handling, and controlled replay. `public/images/articles/api-event-batch-integration/ordering-replay-{1536,768}.webp`

## Exact generation prompts

References for covers: the legacy integration cover for palette/fictional character continuity and `public/brand/nmit-concept.png` for the actual NMIT mark. References for inline illustrations: the payment cover for palette/character continuity and the same logo file.

### Cover: payment

```text
Use case: illustration-story. Asset: professional NMIT technical article cover, landscape 3:2. Input1 ONLY palette and character identity reference, DO NOT copy busy blueprint. Input2 actual NMIT company logo: preserve recognizable teal sides and amber diagonal exactly, include small but clearly visible on lower-left with text 'NMIT'. Design extremely simple flat editorial cut-paper drawing, sage #EEF0E9 background, teal #276057, amber #A5650F, graphite #1B211E. Generous empty space. No grids, decorative marks, construction lines, servers, dashboards, dense network, gradient, glow or watermark. No real tool interface. At lower right under10% image the same two small fictional engineers as Input1: brown-skinned woman dark bob teal overshirt amber tee cream trousers; man curly hair glasses cream shirt teal trousers. One clear visual idea; professional restrained composition. Only the explicitly requested words, crisp readable type. Main motif exactly three items: cream payment receipt at left, amber clock in center and teal seal with cream check at right. One short thin line links them, clock interrupts it suggesting unknown until confirmed. Engineers reviewing receipt. Top-left small label 'PAYMENT INTEGRATION'. Below logo short caption 'Resolve. Verify. Reconcile.' No numbers or fake UI.
```

### Cover: erp-crm

```text
Use case: illustration-story. Asset: professional NMIT technical article cover, landscape 3:2. Input1 ONLY palette and character identity reference, DO NOT copy busy blueprint. Input2 actual NMIT company logo: preserve recognizable teal sides and amber diagonal exactly, include small but clearly visible on lower-left with text 'NMIT'. Design extremely simple flat editorial cut-paper drawing, sage #EEF0E9 background, teal #276057, amber #A5650F, graphite #1B211E. Generous empty space. No grids, decorative marks, construction lines, servers, dashboards, dense network, gradient, glow or watermark. No real tool interface. At lower right under10% image the same two small fictional engineers as Input1: brown-skinned woman dark bob teal overshirt amber tee cream trousers; man curly hair glasses cream shirt teal trousers. One clear visual idea; professional restrained composition. Only the explicitly requested words, crisp readable type. Main motif exactly two upright paper records, one teal header labeled 'ERP', one amber header labeled 'CRM', each three simple horizontal bars. A single shared amber circular tab on their inner edges with same teal key symbol indicates common identity. No connectors or arrows or network. Engineers comparing one paper. Top-left small label 'ERP–CRM INTEGRATION'. Below NMIT logo short caption 'Map. Sync. Recover.'
```

### Cover: patterns

```text
Use case: illustration-story. Asset: professional NMIT technical article cover, landscape 3:2. Input1 ONLY palette and character identity reference, DO NOT copy busy blueprint. Input2 actual NMIT company logo: preserve recognizable teal sides and amber diagonal exactly, include small but clearly visible on lower-left with text 'NMIT'. Design extremely simple flat editorial cut-paper drawing, sage #EEF0E9 background, teal #276057, amber #A5650F, graphite #1B211E. Generous empty space. No grids, decorative marks, construction lines, servers, dashboards, dense network, gradient, glow or watermark. No real tool interface. At lower right under10% image the same two small fictional engineers as Input1: brown-skinned woman dark bob teal overshirt amber tee cream trousers; man curly hair glasses cream shirt teal trousers. One clear visual idea; professional restrained composition. Only the explicitly requested words, crisp readable type. Three widely spaced horizontal motifs stacked vertically: top teal dot straight short arrow to one circle labeled 'API'; middle amber dot fans out through two short lines to two circles labeled 'EVENTS'; bottom three cream paper slips bound with amber band travel as bundle to teal circle labeled 'BATCH'. No other marks. Engineers seated considering alternatives. Top-left small label 'CHOOSE THE RIGHT PATTERN'. Below NMIT logo short caption 'One workflow. The right connection.'
```

### Content: timeout-recovery

```text
Use case: illustration-story. Asset: inline professional technical article image, wide landscape 3:2. Input1 is ONLY the palette and fictional character identity reference, not a composition to copy. Input2 is the actual NMIT logo: preserve its teal sides and amber diagonal, small clearly visible lower-left with word NMIT. Sage #EEF0E9 background, teal #276057, amber #A5650F, graphite #1B211E, cream paper. Simple restrained flat editorial illustration, generous empty space, few objects, no dense diagram, no grid, glow, gradients, dashboards, servers, watermark or real vendor interface. Consistent fictional brown-skinned woman with dark bob, teal overshirt, amber tee, cream trousers; man with curly hair and glasses, cream shirt and teal trousers. Characters small supporting the idea, not dominating. Crisp limited text. Make a DISTINCT scene from the reference cover. A single scene, no left-to-right flow. A fictional engineer inspects a split communication cable: on one side a merchant order card with a small amber question badge, on the other a provider receipt bearing a teal acceptance stamp. The response connection is broken, but receipt exists. The woman points at the receipt, man holds order card. Text only 'RESPONSE LOST ≠ PAYMENT FAILED' and 'NMIT'. Do NOT show guaranteed success recovery or another charge. Close-up editorial metaphor for ambiguous payment state.
```

Original generation: `/Users/vikky/.codex/generated_images/01a0ac15-0a6e-7ce1-9240-a86840b433c5/exec-1dce56a3-b402-4418-a00a-b55f30431a10.png`

### Content: reconciliation

```text
Use case: illustration-story. Asset: inline professional technical article image, wide landscape 3:2. Input1 is ONLY the palette and fictional character identity reference, not a composition to copy. Input2 is the actual NMIT logo: preserve its teal sides and amber diagonal, small clearly visible lower-left with word NMIT. Sage #EEF0E9 background, teal #276057, amber #A5650F, graphite #1B211E, cream paper. Simple restrained flat editorial illustration, generous empty space, few objects, no dense diagram, no grid, glow, gradients, dashboards, servers, watermark or real vendor interface. Consistent fictional brown-skinned woman with dark bob, teal overshirt, amber tee, cream trousers; man with curly hair and glasses, cream shirt and teal trousers. Characters small supporting the idea, not dominating. Crisp limited text. Make a DISTINCT scene from the reference cover. Overhead tabletop editorial illustration: three distinct documents arranged as a wide triangle, labelled 'ORDER', 'PROVIDER', 'LEDGER'. One matching teal transaction token on each, and a small amber unmatched row clipped aside for review. The woman carefully compares documents, the man records the exception. No arrows, no timeline, no elaborate spreadsheet. Text only the three labels and 'NMIT'. Explain comparison of independent records, not automatic force matching.
```

Original generation: `/Users/vikky/.codex/generated_images/01a0ac15-0a6e-7ce1-9240-a86840b433c5/exec-5a7b1454-ddf8-456b-8389-80b9c9237fab.png`

### Content: field-ownership

```text
Use case: illustration-story. Asset: inline professional technical article image, wide landscape 3:2. Input1 is ONLY the palette and fictional character identity reference, not a composition to copy. Input2 is the actual NMIT logo: preserve its teal sides and amber diagonal, small clearly visible lower-left with word NMIT. Sage #EEF0E9 background, teal #276057, amber #A5650F, graphite #1B211E, cream paper. Simple restrained flat editorial illustration, generous empty space, few objects, no dense diagram, no grid, glow, gradients, dashboards, servers, watermark or real vendor interface. Consistent fictional brown-skinned woman with dark bob, teal overshirt, amber tee, cream trousers; man with curly hair and glasses, cream shirt and teal trousers. Characters small supporting the idea, not dominating. Crisp limited text. Make a DISTINCT scene from the reference cover. An open minimal account folder, two clear compartments. Left compartment labelled 'ERP' holds billing and credit paper cards with a lock stamp. Right compartment labelled 'CRM' holds contact and sales paper cards with a lock stamp. Woman holds ERP-side key, man holds CRM-side key; one shared identity tab joins the folder. Large simple shapes, exactly two compartments, no circuit network. Text only 'ERP', 'CRM', 'NMIT'. Explain field ownership rather than all fields copied both directions.
```

Original generation: `/Users/vikky/.codex/generated_images/01a0ac15-0a6e-7ce1-9240-a86840b433c5/exec-63986dd4-1aed-4004-8ee2-ee5b83e4b66c.png`

### Content: sync-exceptions

```text
Use case: illustration-story. Asset: inline professional technical article image, wide landscape 3:2. Input1 is ONLY the palette and fictional character identity reference, not a composition to copy. Input2 is the actual NMIT logo: preserve its teal sides and amber diagonal, small clearly visible lower-left with word NMIT. Sage #EEF0E9 background, teal #276057, amber #A5650F, graphite #1B211E, cream paper. Simple restrained flat editorial illustration, generous empty space, few objects, no dense diagram, no grid, glow, gradients, dashboards, servers, watermark or real vendor interface. Consistent fictional brown-skinned woman with dark bob, teal overshirt, amber tee, cream trousers; man with curly hair and glasses, cream shirt and teal trousers. Characters small supporting the idea, not dominating. Crisp limited text. Make a DISTINCT scene from the reference cover. A calm minimal workshop scene: a conveyor carries three account record cards toward a receiving tray. Two clean cards continue, one amber flagged card is parked on a separate review stand. Woman examines the flagged card while man checks its identifier with a small reference card. No automatic retry arrow and no deletion/bin. Text only 'REVIEW BEFORE REPLAY' and 'NMIT'. Explain isolating invalid records and controlled recovery.
```

Original generation: `/Users/vikky/.codex/generated_images/01a0ac15-0a6e-7ce1-9240-a86840b433c5/exec-16204832-b5d3-4a14-8bc0-c9e3cce33eb2.png`

### Content: hybrid-order

```text
Use case: illustration-story. Asset: inline professional technical article image, wide landscape 3:2. Input1 is ONLY the palette and fictional character identity reference, not a composition to copy. Input2 is the actual NMIT logo: preserve its teal sides and amber diagonal, small clearly visible lower-left with word NMIT. Sage #EEF0E9 background, teal #276057, amber #A5650F, graphite #1B211E, cream paper. Simple restrained flat editorial illustration, generous empty space, few objects, no dense diagram, no grid, glow, gradients, dashboards, servers, watermark or real vendor interface. Consistent fictional brown-skinned woman with dark bob, teal overshirt, amber tee, cream trousers; man with curly hair and glasses, cream shirt and teal trousers. Characters small supporting the idea, not dominating. Crisp limited text. Make a DISTINCT scene from the reference cover. A single fictional customer-order desk, not three large columns or a chain. At centre an approved order card; three small clearly separated objects around it: a handset labelled 'API' for an immediate check, a bell labelled 'EVENT' for notifying independent teams, a neatly tied paper stack labelled 'BATCH' for later comparison. Woman at desk makes the current check, man gathers later reports. No misleading timings, no vendor tools. Text only 'API', 'EVENT', 'BATCH', 'NMIT'. Give a simple one-workflow contextual illustration.
```

Original generation: `/Users/vikky/.codex/generated_images/01a0ac15-0a6e-7ce1-9240-a86840b433c5/exec-c2993b4b-d8f2-407d-b17f-791102ed177e.png`

### Content: ordering-replay

```text
Use case: illustration-story. Asset: inline professional technical article image, wide landscape 3:2. Input1 is ONLY the palette and fictional character identity reference, not a composition to copy. Input2 is the actual NMIT logo: preserve its teal sides and amber diagonal, small clearly visible lower-left with word NMIT. Sage #EEF0E9 background, teal #276057, amber #A5650F, graphite #1B211E, cream paper. Simple restrained flat editorial illustration, generous empty space, few objects, no dense diagram, no grid, glow, gradients, dashboards, servers, watermark or real vendor interface. Consistent fictional brown-skinned woman with dark bob, teal overshirt, amber tee, cream trousers; man with curly hair and glasses, cream shirt and teal trousers. Characters small supporting the idea, not dominating. Crisp limited text. Make a DISTINCT scene from the reference cover. Close-up of two numbered order update cards '01' and '02', arranged out of arrival order on a workbench. Woman holds a small current-state register showing '02'; man sets the older '01' card into an amber review pocket rather than overwriting it. Tiny duplicate pair of '02' cards clipped together on the side. No complex network, no claims of exactly-once delivery. Text only '01', '02', 'CHECK BEFORE APPLYING', 'NMIT'. Explain version checks and duplicate-safe effects.
```

Original generation: `/Users/vikky/.codex/generated_images/01a0ac15-0a6e-7ce1-9240-a86840b433c5/exec-4262e9ad-dcba-45de-b49c-1a2b8bbc6a69.png`
