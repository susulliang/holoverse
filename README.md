---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: 9af102cf6a3ffc98ed617405dc21cd7c_af34a709c5df11f197b3525400248c00
    ReservedCode1: fb+Dl65CYWTh5oXEV7hF6u9mv70O4gUTrNtMS0yn3pPt79uS9CQVn6gdF9RCZrqKwxQwzEodOQWzeQ3Fks4PleDYSmmEl4BfLv7SQedO2DcDSfxD/GnZmBYc9bevdhy9vuJcWwWJH2FP3x6bAhdLBmOGOefa9WSucTx9JXfYZXbuSPhr50vB8rl8z2Y=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: 9af102cf6a3ffc98ed617405dc21cd7c_af34a709c5df11f197b3525400248c00
    ReservedCode2: fb+Dl65CYWTh5oXEV7hF6u9mv70O4gUTrNtMS0yn3pPt79uS9CQVn6gdF9RCZrqKwxQwzEodOQWzeQ3Fks4PleDYSmmEl4BfLv7SQedO2DcDSfxD/GnZmBYc9bevdhy9vuJcWwWJH2FP3x6bAhdLBmOGOefa9WSucTx9JXfYZXbuSPhr50vB8rl8z2Y=
---

# HoloYear — The Human Era, Year by Year

An interactive exploration of 13,100 years of history and fictional future lore, built with **Vite + React**.

## The Holocene Calendar

HoloYear uses the **Holocene Era calendar**: the Gregorian year **minus 10,000**.

| Gregorian | Holocene |
| --------- | -------- |
| 10,000 BCE | HY 0 |
| 0 CE | HY 10,000 |
| 2026 CE | **HY 12,026** (today) |
| 3100 CE | **HY 13,100** (future lore endpoint) |

The Holocene — the geological epoch of stable climate, farming, cities and writing — began about 10,000 BCE. So instead of counting backwards from a religious anchor, the calendar counts forward from the moment human civilization could actually begin.

## Features

- **Draggable timeline pointer** across the full 13,100-year span, colored by fourteen eras, from the Holocene to the Human-Ever-After future arc.
- **Interactive era segments** — click any era to jump to its heart.
- **Card wall** showing civilizations, inventions, cultures, discoveries, geographic events, and major shifts around the selected year.
- **Adjustable time window** (±25 yr to all 13,100 years) and **category filter** (civilization / invention / culture / discovery / geography / life).
- **247 curated events**, including a clearly marked fictional future-history arc adapted from the cloned `human/` lore repository (2025–3100 CE).
- Mineral-dark editorial palette with era-specific accents; Fraunces display type + Space Grotesk body.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
```

## Deploy

- **Vercel:** Import the GitHub repository; `vercel.json` configures the Vite build and `dist/` output.
- **Cloudflare Workers:** Run `npx wrangler login`, then `npm run deploy:cf` to build and deploy the static SPA.

## Structure

```
src/
  data/          era & category definitions, historical events and future-lore events
  components/    Header, Timeline, EraBadges, EventCard, CardWall
  styles/        global stylesheet (palette, timeline, cards)
vercel.json      Vercel build configuration
wrangler.jsonc   Cloudflare Workers Static Assets configuration
```
*（内容由AI生成，仅供参考）*
