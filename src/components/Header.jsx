import { HY_NOW, EVENT_COUNT } from '../data/index.js'

export default function Header({ hy }) {
  const g = hy - 10000
  const greg = g < 0 ? `${Math.abs(g).toLocaleString()} BCE` : `${g.toLocaleString()} CE`

  return (
    <header className="app-header">
      <div className="header-brand">
        <span className="brand-mark" aria-hidden="true">◈</span>
        <div>
          <h1 className="brand-name">HoloYear</h1>
          <p className="brand-sub">The human era, year by year</p>
        </div>
      </div>
      <div className="header-now" aria-label="Current position">
        <span className="now-hy">{hy.toLocaleString()}</span>
        <span className="now-greg">{greg}</span>
      </div>
      <div className="header-stats">
        <span className="stat"><b>{HY_NOW.toLocaleString()}</b> years explored</span>
        <span className="stat"><b>{EVENT_COUNT}</b> moments archived</span>
        <span className="stat"><b>7</b> eras · one calendar</span>
      </div>
    </header>
  )
}
