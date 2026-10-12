import { getEraForHy, CATEGORIES } from '../data/index.js'

// One history card: year badge, category tag, title and a short story.
export default function EventCard({ event }) {
  const era = getEraForHy(event.hy)
  const cat = CATEGORIES[event.c]
  const g = event.hy - 10000
  const greg = g < 0 ? `${Math.abs(g).toLocaleString()} BCE` : `${g.toLocaleString()} CE`

  return (
    <article
      className="event-card"
      style={{ '--card-era': era.color, '--card-cat': cat.color }}
      data-era={era.id}
    >
      <div className="card-topline">
        <span className="card-hy" style={{ color: era.color }}>{event.hy.toLocaleString()} HY</span>
        <span className="card-greg">{greg}</span>
        <span className="card-cat" style={{ background: cat.color }}>{cat.singular}</span>
      </div>
      <h3 className="card-title">{event.t}</h3>
      <p className="card-desc">{event.d}</p>
      {event.r && <span className="card-region">{event.r}</span>}
    </article>
  )
}
