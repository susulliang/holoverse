import { useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import Timeline from './components/Timeline.jsx'
import EraBadges from './components/EraBadges.jsx'
import CardWall from './components/CardWall.jsx'
import { ALL_EVENTS, HY_NOW, CATEGORIES, CATEGORY_IDS } from './data/index.js'

const WINDOWS = [25, 50, 100, 250, 500, Infinity]

export default function App() {
  const [hy, setHy] = useState(HY_NOW)
  const [windowHalf, setWindowHalf] = useState(500)
  const [activeCat, setActiveCat] = useState('all')

  const visibleEvents = useMemo(() => {
    let list = ALL_EVENTS.filter((e) => Math.abs(e.hy - hy) <= windowHalf)
    if (activeCat !== 'all') list = list.filter((e) => e.c === activeCat)
    return list
  }, [hy, windowHalf, activeCat])

  const windowLabel = (w) => (w === Infinity ? 'All 12,026' : `±${w} yr`)

  return (
    <div className="app">
      <Header hy={hy} />

      <main className="app-main">
        <section className="timeline-section">
          <Timeline hy={hy} onChange={setHy} />
          <EraBadges hy={hy} onJump={setHy} />

          <div className="controls">
            <div className="zoom-control">
              <span className="control-label">Window</span>
              <div className="zoom-btns">
                {WINDOWS.map((w) => (
                  <button
                    key={w}
                    className={`zoom-btn ${windowHalf === w ? 'is-active' : ''}`}
                    onClick={() => setWindowHalf(w)}
                  >
                    {windowLabel(w)}
                  </button>
                ))}
              </div>
            </div>

            <div className="cat-control">
              <span className="control-label">Filter</span>
              <div className="cat-btns">
                <button className={`cat-btn ${activeCat === 'all' ? 'is-active' : ''}`} onClick={() => setActiveCat('all')}>All</button>
                {CATEGORY_IDS.map((id) => (
                  <button
                    key={id}
                    className={`cat-btn ${activeCat === id ? 'is-active' : ''}`}
                    style={{ '--cat-color': CATEGORIES[id].color }}
                    onClick={() => setActiveCat(id)}
                  >
                    {CATEGORIES[id].singular}
                  </button>
                ))}
              </div>
            </div>

            {hy !== HY_NOW && (
              <button className="today-btn" onClick={() => setHy(HY_NOW)}>↺ Return to today</button>
            )}
          </div>

          <p className="wall-meta">
            Showing <b>{visibleEvents.length}</b> moments near <b>HY {hy.toLocaleString()}</b>
            {activeCat !== 'all' && <> · filtered by <b>{CATEGORIES[activeCat].singular}</b></>}
          </p>
        </section>

        <CardWall events={visibleEvents} showGuide={windowHalf <= 100} />
      </main>

      <footer className="app-footer">
        <p>HoloYear counts years from 10,000 BCE, when the Holocene began — because 2026 is just a number, but 12,026 is a story.</p>
      </footer>
    </div>
  )
}
