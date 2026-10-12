import EventCard from './EventCard.jsx'

// Masonry column layout for the events visible near the selected year.
export default function CardWall({ events, showGuide }) {
  if (events.length === 0) {
    return (
      <div className="empty-state">
        <p>Nothing archived for this exact year — drag the pointer to nearby eras, or widen the window below.</p>
      </div>
    )
  }

  // Split into three columns by index for a masonry feel (keeps chronological order).
  const cols = [[], [], []]
  events.forEach((e, i) => cols[i % 3].push(e))

  return (
    <div className={`card-wall ${showGuide ? 'with-guide' : ''}`}>
      {cols.map((col, ci) => (
        <div className="card-col" key={ci}>
          {col.map((e) => <EventCard key={e.t + e.hy} event={e} />)}
        </div>
      ))}
    </div>
  )
}
