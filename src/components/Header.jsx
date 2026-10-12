import { EVENT_COUNT, ERAS } from '../data/index.js'

export default function Header({ hy }) {
  const g = hy - 10000
  const greg = g < 0 ? `${Math.abs(g).toLocaleString()} BCE` : `${g.toLocaleString()} CE`

  return (
    <header className="app-header">
      <div className="header-brand">
        <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
        <div>
          <h1 className="brand-name">HoloYear</h1>
          <p className="brand-sub">A new perspective on time</p>
        </div>
      </div>
      <div className="header-right">
        <div className="header-stats" aria-label="Archive overview">
          <span className="stat"><b>{EVENT_COUNT}</b> moments</span>
          <span className="stat-divider" />
          <span className="stat"><b>{ERAS.length}</b> eras</span>
        </div>
        <div className="header-now" aria-label="Current position">
          <span className="now-label">YOU ARE EXPLORING</span>
          <span className="now-reading">
            <span className="now-hy">{hy.toLocaleString()}</span>
            <span className="now-unit">HY</span>
          </span>
          <span className="now-greg">{greg}</span>
        </div>
      </div>
    </header>
  )
}
