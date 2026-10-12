import { useRef, useCallback, useState, useEffect } from 'react'
import { HY_START, HY_NOW, ERAS, getEraForHy } from '../data/index.js'

// Top timeline: a spectral band of seven eras, a draggable pointer,
// era tick labels, and a vertical guide line that runs behind the card wall.
export default function Timeline({ hy, onChange, pointerTop }) {
  const trackRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [guideHover, setGuideHover] = useState(false)

  const hyFromClientX = useCallback((clientX) => {
    const rect = trackRef.current.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    return Math.round(ratio * (HY_NOW - HY_START))
  }, [])

  const handlePointerDown = (e) => {
    e.preventDefault()
    setDragging(true)
    onChange(hyFromClientX(e.clientX))
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
  }

  const handlePointerMove = (e) => {
    if (dragging) onChange(hyFromClientX(e.clientX))
  }

  const handlePointerUp = () => {
    setDragging(false)
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerup', handlePointerUp)
  }

  useEffect(() => {
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [dragging])

  const era = getEraForHy(hy)
  const pct = ((hy - HY_START) / (HY_NOW - HY_START)) * 100
  const trackRefReady = !!trackRef.current

  return (
    <div className="timeline-wrap">
      <div
        ref={trackRef}
        className={`timeline-track ${dragging ? 'is-dragging' : ''}`}
        onPointerDown={handlePointerDown}
        style={{ '--pointer-pos': `${pct}%`, '--era-color': era.color }}
      >
        {/* Era segments */}
        <div className="era-segments">
          {ERAS.map((e) => (
            <button
              key={e.id}
              className="era-segment"
              style={{
                '--seg-color': e.color,
                left: `${(e.range[0] / (HY_NOW - HY_START)) * 100}%`,
                width: `${((e.range[1] - e.range[0]) / (HY_NOW - HY_START)) * 100}%`
              }}
              title={`${e.name} (HY ${e.range[0]}–${e.range[1]})`}
              onClick={() => onChange(Math.round((e.range[0] + e.range[1]) / 2))}
            />
          ))}
        </div>

        {/* Tick labels */}
        <div className="tick-labels">
          {[0, 2000, 4000, 6000, 8000, 10000, 12000].map((hyTick) => (
            <span
              key={hyTick}
              className="tick"
              style={{ left: `${(hyTick / (HY_NOW - HY_START)) * 100}%` }}
            >
              <i />
              {hyTick === 0 ? 'HY 0' : hyTick >= 10000 ? `${hyTick / 1000}k` : `${hyTick / 1000}k`}
            </span>
          ))}
        </div>

        {/* Draggable pointer */}
        <div className="timeline-pointer" role="slider" aria-label={`Holocene year ${hy}`} aria-valuenow={hy} aria-valuemin={0} aria-valuemax={12026} tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') onChange(Math.max(0, hy - (e.shiftKey ? 100 : 1)))
            if (e.key === 'ArrowRight') onChange(Math.min(HY_NOW, hy + (e.shiftKey ? 100 : 1)))
          }}
        >
          <span className="pointer-dot" />
          <span className="pointer-stem" />
        </div>

        {/* Guide line below the track */}
        <div className={`guide-line ${guideHover ? 'is-hover' : ''}`} style={{ left: `${pct}%` }} />
      </div>

      <div className="timeline-readout">
        <span className="readout-hy" style={{ color: era.color }}>{hy.toLocaleString()}</span>
        <span className="readout-label">HoloYear</span>
        <span className="readout-sep">·</span>
        <span className="readout-era">{era.name}</span>
        <span className="readout-sep">·</span>
        <span className="readout-greg">{hy <= 10000 ? `${(10000 - hy).toLocaleString()} BCE` : `${(hy - 10000).toLocaleString()} CE`}</span>
      </div>
    </div>
  )
}
