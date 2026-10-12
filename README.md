# HoloYear — The Human Era, Year by Year

An interactive exploration of 12,026 years of Earth and human history, built with **Vite + React**.

## The Holocene Calendar

HoloYear uses the **Holocene Era calendar**: the Gregorian year **minus 10,000**.

| Gregorian | Holocene |
| --------- | -------- |
| 10,000 BCE | HY 0 |
| 0 CE | HY 10,000 |
| 2026 CE | **HY 12,026** (today) |

The Holocene — the geological epoch of stable climate, farming, cities and writing — began about 10,000 BCE. So instead of counting backwards from a religious anchor, the calendar counts forward from the moment human civilization could actually begin.

## Features

- **Draggable timeline pointer** across the full 12,026-year span, colored by seven eras:
  Dawn of the Holocene · The First Farmers · Cities & Clay · Bronze & Iron · The Axial Age · Kingdoms & Oceans · The Modern Surge
- **Interactive era segments** — click any era to jump to its heart.
- **Card wall** showing civilizations, inventions, cultures, discoveries, geographic events, and major shifts around the selected year.
- **Adjustable time window** (±25 yr to all 12,026 years) and **category filter** (civilization / invention / culture / discovery / geography / life).
- **200+ curated events** researched from primary-history sources, the provided *History of Human Civilization* transcript, and online references.
- Deep-space palette with a seven-hue era spectrum; Fraunces display type + Space Grotesk body.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
```

## Structure

```
src/
  data/          era & category definitions, 200+ curated events (7 era files)
  components/    Header, Timeline, EraBadges, EventCard, CardWall
  styles/        global stylesheet (palette, timeline, cards)
```
