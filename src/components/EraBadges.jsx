import { ERAS } from '../data/index.js'

// Clickable era chips for quick jumping along the timeline.
export default function EraBadges({ hy, onJump }) {
  return (
    <div className="era-badges" role="tablist" aria-label="Eras">
      {ERAS.map((e) => {
        const active = hy >= e.range[0] && hy <= e.range[1]
        return (
          <button
            key={e.id}
            className={`era-badge ${active ? 'is-active' : ''}`}
            style={{ '--era-color': e.color }}
            onClick={() => onJump(Math.round((e.range[0] + e.range[1]) / 2))}
          >
            <span className="era-badge-dot" />
            <span className="era-badge-name">{e.short}</span>
            <span className="era-badge-range">HY {e.range[0].toLocaleString()}–{e.range[1].toLocaleString()}</span>
          </button>
        )
      })}
    </div>
  )
}
