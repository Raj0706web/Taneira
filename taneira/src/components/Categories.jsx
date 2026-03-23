import { CATS, toast } from '../data.js'

export default function CatsSec({ onNav }) {
  return (
    <section className="cats">
      <div className="cat-hd">
        <span className="sec-pre">Explore Our</span>
        <h2 className="sec-ttl">Curated Collections</h2>
        <div className="sec-div">
          <span className="sdl" />
          <span className="sdd">◆</span>
          <span className="sdl" />
        </div>
      </div>
      <div className="cat-gr">
        {CATS.map((c, i) => {
          const navTarget = c.name === 'Bridal' ? 'Wedding' : c.name;
          return (
          <div key={i} className="cc" style={{ animationDelay: `${i * 0.07}s` }} onClick={() => onNav?.(navTarget)}>
            <div className="cc-bg" style={{ background: c.color }} />
            <div className="cc-in">
              <div style={{ 
                width: '60px', height: '60px', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'var(--blush)', borderRadius: '50%',
                fontFamily: 'var(--fb), "Playfair Display", Georgia, serif', 
                fontSize: '2rem', 
                lineHeight: 1,
                fontStyle: 'italic', 
                fontWeight: 600, 
                color: 'var(--deep-maroon)',
                boxShadow: '0 4px 12px rgba(92,26,26,0.1)'
              }}>
                {c.name.charAt(0)}
              </div>
              <div>
                <div className="cc-n">{c.name}</div>
                <div className="cc-c">{c.count}</div>
              </div>
              <span className="cc-arr">→</span>
            </div>
          </div>
        )
        })}
      </div>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 34 }}>
        <button className="btn-om" onClick={() => onNav?.('All')}>View All Categories</button>
        <button className="btn-m" onClick={() => onNav?.('New')}>New Arrivals</button>
      </div>
    </section>
  )
}
