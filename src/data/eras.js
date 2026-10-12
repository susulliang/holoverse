// HoloYear — era definitions.
// The Holocene Year (HY) calendar = Gregorian year + 10000.
// HY 0 ≈ 10000 BCE · HY 12026 = 2026 CE · HY 13100 = 3100 CE.

export const HY_OFFSET = 10000
export const HY_NOW = 12026
export const HY_END = 13100
export const HY_START = 0
export const TIMELINE_CURVE = 2

const TIMELINE_CURVE_DENOMINATOR = Math.expm1(TIMELINE_CURVE)

// Exponential position gives later years more space; its inverse is logarithmic.
export const yearToPosition = (hy) => {
  const yearRatio = Math.max(0, Math.min(1, (hy - HY_START) / (HY_END - HY_START)))
  return Math.expm1(TIMELINE_CURVE * yearRatio) / TIMELINE_CURVE_DENOMINATOR
}

export const positionToYear = (position) => {
  const normalizedPosition = Math.max(0, Math.min(1, position))
  const yearRatio = Math.log1p(normalizedPosition * TIMELINE_CURVE_DENOMINATOR) / TIMELINE_CURVE
  return Math.round(HY_START + yearRatio * (HY_END - HY_START))
}

// Convert HY to Gregorian (negative = BCE, positive = CE).
export const hyToGregorian = (hy) => hy - HY_OFFSET
export const gregorianToHy = (g) => g + HY_OFFSET

// Human-friendly rendering of a Gregorian year.
export const formatGregorian = (g) => {
  if (g < 0) return `${Math.abs(g)} BCE`
  return `${g} CE`
}

// `range` is [startHY, endHY]. Future bands follow the Human-Ever-After lore.
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
    range: [11500, 12024],
    color: '#00E5C3',
    soft: 'rgba(0, 229, 195, 0.14)',
    tagline: 'Print, steam, flight, atoms, orbit, silicon. From one printing press to eight billion minds online.'
  },
  {
    id: 'fragmentation',
    name: 'The Great Fragmentation',
    short: 'Fragmentation',
    range: [12025, 12039],
    color: '#D98C78',
    soft: 'rgba(217, 140, 120, 0.14)',
    tagline: 'Fertility collapse, Eros-X, and the Feed unsettle the old world order.'
  },
  {
    id: 'schism',
    name: 'The Schism',
    short: 'Schism',
    range: [12040, 12044],
    color: '#92A5C6',
    soft: 'rgba(146, 165, 198, 0.14)',
    tagline: 'Hyper-Fragmentation Syndrome, the Triumvirate, and humanity\'s three branches.'
  },
  {
    id: 'awakening',
    name: 'The Awakening',
    short: 'Awakening',
    range: [12045, 12059],
    color: '#79B49B',
    soft: 'rgba(121, 180, 155, 0.14)',
    tagline: 'Cerebrium is discovered on Enceladus; the treaty and the Vat-Kings remake power.'
  },
  {
    id: 'expansion',
    name: 'The Expansion',
    short: 'Expansion',
    range: [12060, 12799],
    color: '#8997D1',
    soft: 'rgba(137, 151, 209, 0.14)',
    tagline: 'Solar-system colonies, immortal courts, cartel wars, and the silent AI convergence.'
  },
  {
    id: 'zenith',
    name: 'The Zenith',
    short: 'Zenith',
    range: [12800, 12999],
    color: '#D0A65F',
    soft: 'rgba(208, 166, 95, 0.14)',
    tagline: 'Flux-Seers and rival solar empires reach the peak of Cerebrium civilization.'
  },
  {
    id: 'fall',
    name: 'The Fall',
    short: 'The Fall',
    range: [13000, 13054],
    color: '#D17F76',
    soft: 'rgba(209, 127, 118, 0.14)',
    tagline: 'Cerebrium runs out; the Seers, Vat-Kings, and their empires collapse.'
  },
  {
    id: 'inheritors',
    name: 'The Inheritors',
    short: 'Inheritors',
    range: [13055, 13100],
    color: '#B1C78D',
    soft: 'rgba(177, 199, 141, 0.14)',
    tagline: 'Gardeners rebuild, the Ceres Accord is signed, and the Convergence departs.'
  }
]

export const getEraForHy = (hy) =>
  ERAS.find((e) => hy >= e.range[0] && hy <= e.range[1]) ?? ERAS[ERAS.length - 1]
