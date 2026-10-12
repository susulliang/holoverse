import { useRef, useCallback, useState, useEffect } from 'react'
import { HY_START, HY_END, ERAS, getEraForHy, positionToYear, yearToPosition } from '../data/index.js'

// Top timeline: era bands with a draggable pointer,
// era tick labels, and a vertical guide line that runs behind the card wall.
export default function Timeline({ hy, onChange }) {
  const trackRef = useRef(null)
  const draggingRef = useRef(false)
  const [dragging, setDragging] = useState(false)

  const hyFromClientX = useCallback((clientX) => {
    const rect = trackRef.current.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    return positionToYear(ratio)
  }, [])

  const handlePointerDown = (e) => {
    e.preventDefault()
    draggingRef.current = true
    setDragging(true)
    onChange(hyFromClientX(e.clientX))
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
  }

  const handlePointerMove = useCallback((e) => {
    if (draggingRef.current) onChange(hyFromClientX(e.clientX))
  }, [hyFromClientX, onChange])

  const handlePointerUp = useCallback(() => {
    draggingRef.current = false
    setDragging(false)
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerup', handlePointerUp)
  }, [handlePointerMove])

  useEffect(() => () => {
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerup', handlePointerUp)
  }, [handlePointerMove, handlePointerUp])

  const era = getEraForHy(hy)
  const pct = yearToPosition(hy) * 100

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
                left: `${yearToPosition(e.range[0]) * 100}%`,
                width: `${(yearToPosition(e.range[1]) - yearToPosition(e.range[0])) * 100}%`
              }}
              title={`${e.name} (HY ${e.range[0]}–${e.range[1]})`}
              onClick={() => onChange(Math.round((e.range[0] + e.range[1]) / 2))}
            />
          ))}
        </div>

        {/* Tick labels */}
        <div className="tick-labels">
          {[0, 2000, 4000, 6000, 8000, 10000, 12000, HY_END].map((hyTick) => (
            <span
              key={hyTick}
              className="tick"
              style={{ left: `${yearToPosition(hyTick) * 100}%` }}
            >
              <i />
              {hyTick === 0 ? 'HY 0' : hyTick === HY_END ? '13.1k' : `${hyTick / 1000}k`}
            </span>
          ))}
        </div>

        {/* Draggable pointer */}
        <div className="timeline-pointer" role="slider" aria-label={`Holocene year ${hy}`} aria-valuenow={hy} aria-valuemin={HY_START} aria-valuemax={HY_END} tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') onChange(Math.max(0, hy - (e.shiftKey ? 100 : 1)))
            if (e.key === 'ArrowRight') onChange(Math.min(HY_END, hy + (e.shiftKey ? 100 : 1)))
          }}
        >
          <span className="pointer-dot" />
          <span className="pointer-stem" />
        </div>

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
