// HoloYear — event categories.
// Each card belongs to one category; categories own their accent color and glyph.

export const CATEGORIES = {
  civilization: {
    label: 'Civilizations',
    singular: 'Civilization',
    color: '#E8B04C',
    glyph: '🏛'
  },
  invention: {
    label: 'Inventions',
    singular: 'Invention',
    color: '#4D9DE0',
    glyph: '⚙'
  },
  culture: {
    label: 'Culture & Belief',
    singular: 'Culture',
    color: '#F15BB5',
    glyph: '✦'
  },
  discovery: {
    label: 'Discoveries',
    singular: 'Discovery',
    color: '#00E5C3',
    glyph: '⌖'
  },
  geography: {
    label: 'Earth Events',
    singular: 'Earth Event',
    color: '#3AAE8B',
    glyph: '◮'
  },
  life: {
    label: 'Life & Species',
    singular: 'Life Event',
    color: '#E07A5F',
    glyph: '❋'
  }
}

export const CATEGORY_IDS = Object.keys(CATEGORIES)
