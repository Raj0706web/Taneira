import { useState, useEffect } from 'react'
import { SLIDES, toast } from '../data.js'

export default function HeroSec({ onNav, onOpenModal }) {
  const [active, setActive] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const t = setInterval(() => {
      setFading(true)
      setTimeout(() => { setActive(p => (p + 1) % SLIDES.length); setFading(false) }, 380)
    }, 5800)
    return () => clearInterval(t)
  }, [])

  const s = SLIDES[active]

  return (
    <section className="hero">
      <div className="h-bg" style={{ background: s.bg, inset: 0, position: 'absolute', opacity: fading ? 0 : 1 }}>
        <div className="h-pat" />
      </div>
      <div className="h-con" style={{ opacity: fading ? 0 : 1, transform: fading ? 'translateY(8px)' : 'none' }}>
        <div className="h-tag">
          <span className="h-dot" />
          {s.tag}
        </div>
        <h1 className="h-hl">
          {s.hl.map((l, i) => <span key={i}>{l}</span>)}
        </h1>
        <p className="h-sub">{s.sub}</p>
        <div className="h-ctas">
          <button className="btn-g" onClick={() => {
            if (s.cta.includes('Sarees')) onNav?.('Sarees')
            else if (s.cta.includes('Kurtas')) onNav?.('Kurtas')
            else if (s.cta.includes('Lehengas')) onNav?.('Lehengas')
            else onNav?.('All')
          }}>{s.cta} →</button>
          <button className="btn-ol" onClick={() => {
            if (s.cta2.includes('Lookbook')) onOpenModal?.('lookbook')
            else if (s.cta2.includes('Appointment')) onOpenModal?.('appointment')
          }}>{s.cta2}</button>
        </div>
      </div>
      <div className="h-scroll">
        <span>Scroll</span>
        <div className="h-sl"><div className="h-sd" /></div>
      </div>
      <div className="h-bot">
        <div className="h-dots">
          {SLIDES.map((_, i) => (
            <button key={i} className={`h-dt${i === active ? ' a' : ''}`} onClick={() => setActive(i)} />
          ))}
        </div>
        <div className="h-num">
          <span className="h-curr">{String(active + 1).padStart(2, '0')}</span>
          <span style={{ color: 'rgba(212,168,75,.38)' }}> / </span>
          <span>{String(SLIDES.length).padStart(2, '0')}</span>
        </div>
        <div className="h-badges">
          {['100+ Weavers', '20+ Clusters', 'Est. 2017'].map(b => (
            <span key={b} className="h-badge">{b}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
