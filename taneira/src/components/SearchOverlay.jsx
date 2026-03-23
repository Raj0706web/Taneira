import { useState } from 'react'
import { toast } from '../data.js'

const TAGS = ['Banarasi Saree','Kanjivaram','Bridal Lehenga','Chanderi Kurta','Silk Sarees','Dupattas','Paithani']

export default function SearchOverlay({ onClose, prods, addToCart }) {
  const [q, setQ] = useState('')
  const res = q.length > 1
    ? prods.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.weave.toLowerCase().includes(q.toLowerCase()))
    : []

  return (
    <div className="sov" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="sb">
        <div className="sb-hd">
          <h3>Search Taneira</h3>
          <button className="sb-close" onClick={onClose}>✕</button>
        </div>
        <div className="si-wrap">
          <input
            className="si"
            placeholder="Search sarees, kurtas, lehengas, weaves..."
            value={q}
            onChange={e => setQ(e.target.value)}
            autoFocus
            onKeyDown={e => {
              if (e.key === 'Escape') onClose()
              if (e.key === 'Enter' && q.trim()) toast(`Searching "${q}"...`, 'i', '🔍')
            }}
          />
          <button className="ss" onClick={() => q.trim() && toast(`Searching "${q}"...`, 'i', '🔍')}>Search</button>
        </div>
        {res.length > 0 ? (
          <>
            <span className="sr-label">{res.length} result{res.length !== 1 ? 's' : ''} found</span>
            <div className="sr-results">
              {res.map(p => (
                <div key={p.id} className="sr-item" onClick={() => { toast(`Opening ${p.name}`, 'i', '✦'); onClose() }}>
                  <div className="sr-thumb" style={{ background: `linear-gradient(135deg,${p.color}33,${p.color}66)` }}>{p.icon}</div>
                  <div className="sr-info">
                    <div className="sr-iname">{p.name}</div>
                    <div className="sr-iprice">₹{p.price.toLocaleString('en-IN')}</div>
                  </div>
                  <button className="bb" style={{ fontSize: '.62rem', padding: '7px 14px' }} onClick={e => { e.stopPropagation(); addToCart(p, 1, p.sizes[0], p.color); onClose() }}>
                    Add to Bag
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <span className="sr-label">Popular searches</span>
            <div className="sr-tags">
              {TAGS.map(t => <button key={t} className="sr-tag" onClick={() => setQ(t)}>{t}</button>)}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
