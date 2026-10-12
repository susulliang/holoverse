import { useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import Timeline from './components/Timeline.jsx'
import EraBadges from './components/EraBadges.jsx'
import CardWall from './components/CardWall.jsx'
import { ALL_EVENTS, HY_NOW, HY_END, CATEGORIES, CATEGORY_IDS } from './data/index.js'

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

  const windowLabel = (w) => (w === Infinity ? `All ${HY_END.toLocaleString()}` : `±${w} yr`)

  return (
    <div className="app">
      <Header hy={hy} />

      <main className="app-main">
        <section className="intro">
          <div className="intro-copy">
            <p className="eyebrow"><span className="eyebrow-line" />A living atlas of time</p>
            <h2>{HY_END.toLocaleString()} years.<br /><span>One continuous story.</span></h2>
            <p className="intro-description">
              Move through the human era, from the first settled communities to an imagined future among the stars.
            </p>
          </div>
          <div className="intro-note">
            <span className="note-orbit" aria-hidden="true"><i /><i /><i /></span>
            <span>One calendar<br /><b>Everything connected</b></span>
          </div>
        </section>

        <section className="timeline-section">
          <div className="section-heading">
            <div>
              <p className="section-kicker">01 / Navigate</p>
              <h2>Find your moment</h2>
            </div>
            <span className="section-hint">Drag the marker or choose an era</span>
          </div>
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

        </section>

        <section className="moments-section">
          <div className="moments-heading">
            <div>
              <p className="section-kicker">02 / Discover</p>
              <h2>Moments in the making</h2>
            </div>
            <p className="wall-meta">
              <b>{visibleEvents.length}</b> {visibleEvents.length === 1 ? 'moment' : 'moments'} near HY {hy.toLocaleString()}
              {activeCat !== 'all' && <> <span className="meta-divider">/</span> {CATEGORIES[activeCat].singular}</>}
            </p>
          </div>
          <CardWall events={visibleEvents} showGuide={windowHalf <= 100} />
        </section>
      </main>

      <footer className="app-footer">
        <p>HoloYear counts forward from 10,000 BCE. Human-Ever-After is a fictional future-history arc spanning 2025–3100 CE; its events are lore, not recorded history.</p>
      </footer>
    </div>
  )
}
