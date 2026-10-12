import { DAWN_EVENTS } from './events-dawn.js'
import { NEOLITHIC_EVENTS } from './events-neolithic.js'
import { CITIES_EVENTS } from './events-cities.js'
import { BRONZE_EVENTS } from './events-bronze.js'
import { AXIAL_EVENTS } from './events-axial.js'
import { KINGDOMS_EVENTS } from './events-kingdoms.js'
import { MODERN_EVENTS } from './events-modern.js'

export * from './eras.js'
export * from './categories.js'

export const ALL_EVENTS = [
  ...DAWN_EVENTS,
  ...NEOLITHIC_EVENTS,
  ...CITIES_EVENTS,
  ...BRONZE_EVENTS,
  ...AXIAL_EVENTS,
  ...KINGDOMS_EVENTS,
  ...MODERN_EVENTS
].sort((a, b) => a.hy - b.hy)

export const EVENT_COUNT = ALL_EVENTS.length

// Pick events near a given Holocene year within a half-window.
export const eventsNear = (hy, halfWindow) =>
  ALL_EVENTS.filter((e) => Math.abs(e.hy - hy) <= halfWindow)
