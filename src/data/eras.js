// HoloYear — era definitions.
// The Holocene Year (HY) calendar = Gregorian year + 10000.
// HY 0 ≈ 10000 BCE · HY 4000 ≈ 6000 BCE · HY 8000 ≈ 2000 BCE · HY 12026 = 2026 CE.

export const HY_OFFSET = 10000
export const HY_NOW = 12026
export const HY_START = 0

// Convert HY to Gregorian (negative = BCE, positive = CE).
export const hyToGregorian = (hy) => hy - HY_OFFSET
export const gregorianToHy = (g) => g + HY_OFFSET

// Human-friendly rendering of a Gregorian year.
export const formatGregorian = (g) => {
  if (g < 0) return `${Math.abs(g)} BCE`
  return `${g} CE`
}

// Seven era bands across the full 12026-year span. Each era owns one hue of
// the spectral band that runs along the timeline. `range` is [startHY, endHY].
export const ERAS = [
  {
    id: 'dawn',
    name: 'Dawn of the Holocene',
    short: 'Dawn',
    range: [0, 2000],
    color: '#E8B04C',
    soft: 'rgba(232, 176, 76, 0.14)',
    tagline: 'Monuments before farming. Hunter-gatherers raise the first temples on the hills of Anatolia.'
  },
  {
    id: 'neolithic',
    name: 'The Neolithic Turn',
    short: 'Neolithic',
    range: [2000, 4000],
    color: '#E07A5F',
    soft: 'rgba(224, 122, 95, 0.14)',
    tagline: 'Seeds become settlements. Agriculture, pottery and the first great villages remake daily life.'
  },
  {
    id: 'cities',
    name: 'Cities & First Scripts',
    short: 'City & Script',
    range: [4000, 6000],
    color: '#3AAE8B',
    soft: 'rgba(58, 174, 139, 0.14)',
    tagline: 'Rivers bent, grain counted, clay marked. Temple economies swell toward the first true cities.'
  },
  {
    id: 'bronze',
    name: 'Bronze Empires',
    short: 'Bronze',
    range: [6000, 8000],
    color: '#9B5DE5',
    soft: 'rgba(155, 93, 229, 0.14)',
    tagline: 'Writing, pyramids, chariots. Egypt, Sumer, the Indus and Shang China build the first states.'
  },
  {
    id: 'axial',
    name: 'Iron & the Axial Age',
    short: 'Axial Age',
    range: [8000, 10000],
    color: '#F15BB5',
    soft: 'rgba(241, 91, 181, 0.14)',
    tagline: 'Iron, philosophy and universal faiths. Persia, Greece, Rome, India and Han China converge on one age.'
  },
  {
    id: 'kingdoms',
    name: 'Kingdoms & Oceans',
    short: 'Kingdoms',
    range: [10000, 11500],
    color: '#4D9DE0',
    soft: 'rgba(77, 157, 224, 0.14)',
    tagline: 'Rome, Mecca, Chang\'an and the Viking sea. The Silk Roads knit a world, then sails cross every ocean.'
  },
  {
    id: 'modern',
    name: 'The Modern Surge',
    short: 'Modern',
    range: [11500, 12026],
    color: '#00E5C3',
    soft: 'rgba(0, 229, 195, 0.14)',
    tagline: 'Print, steam, flight, atoms, orbit, silicon. From one printing press to eight billion minds online.'
  }
]

export const getEraForHy = (hy) =>
  ERAS.find((e) => hy >= e.range[0] && hy <= e.range[1]) ?? ERAS[ERAS.length - 1]
