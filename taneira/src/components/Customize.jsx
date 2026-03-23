import { useState } from 'react'
import { WEAVES, OCCASIONS, BORDERS, MOTIFS, ZARI, FABCOLS, toast } from '../data.js'

const ICONS = { Saree: '🥻', Lehenga: '✨', Kurta: '👗', Dupatta: '🎀', Shawl: '🧣' }
const BASE = { Saree: 12000, Lehenga: 22000, Kurta: 4500, Dupatta: 3200, Shawl: 5500 }
const MULT = { Banarasi: 1.55, Kanjivaram: 1.72, Chanderi: 1.22, Paithani: 1.62, Ikat: 1.32, Bandhani: 1.12, Patola: 2.05, Jamdani: 1.45, Tussar: 1.18, Sambalpuri: 1.28 }
const ZARI_PR = { 'Real Zari (Gold)': 4000, 'Tested Zari': 1800, 'Silver Zari': 3200, 'No Zari': 0, 'Copper Zari': 2200 }
const BLOUSE_PR = 2500

export default function CustSec({ addToCart }) {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [f, setF] = useState({ garment: 'Saree', weave: 'Banarasi', color: '#8B1A1A', border: 'Zari Gold', motif: '🌸 Floral', zari: 'Real Zari (Gold)', occasion: 'Wedding', size: 'M', blouse: 'yes', name: '', email: '', phone: '', notes: '', rush: false })
  const [orderId] = useState(`TAN-${Date.now().toString().slice(-6)}`)
  const set = (k, v) => setF(p => ({ ...p, [k]: v }))
  const price = Math.round(BASE[f.garment] * (MULT[f.weave] || 1) + (ZARI_PR[f.zari] || 0) + (f.garment === 'Saree' && f.blouse === 'yes' ? BLOUSE_PR : 0) + (f.rush ? 3000 : 0))
  const steps = ['Garment', 'Design', 'Details', 'Contact']

  const handleSubmit = () => {
    if (!f.name.trim()) { toast('Please enter your name', 'e', '⚠️'); return }
    if (f.phone.trim().length < 10) { toast('Please enter a valid phone number', 'e', '⚠️'); return }
    setDone(true)
    const prod = { id: Date.now(), name: `Custom ${f.weave} ${f.garment}`, price, mrp: price, weave: f.weave, color: f.color, icon: ICONS[f.garment] || '🥻', cat: f.garment + 's' }
    setTimeout(() => addToCart(prod, 1, f.size, f.color), 600)
    toast('Custom order submitted! Our team will call you within 24 hours.', 's', '🎉')
  }

  if (done) return (
    <section className="cust">
      <div className="cust-success">
        <div className="cs-ico">🎉</div>
        <h3 className="cs-ttl">Order #{orderId} Confirmed!</h3>
        <p className="cs-sub">Your custom {f.weave} {f.garment} request is received. Our expert will call you at {f.phone} within 24 hours.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-m" onClick={() => { setDone(false); setStep(0) }}>Create Another</button>
          <button className="btn-om" onClick={() => toast('Opening order tracker...', 'i', '📦')}>Track Order</button>
        </div>
      </div>
    </section>
  )

  return (
    <section className="cust">
      <div className="cust-hd">
        <span className="sec-pre">Bespoke Craftsmanship</span>
        <h2 className="sec-ttl">Customise Your Garment</h2>
        <div className="sec-div"><span className="sdl" /><span className="sdd">◆</span><span className="sdl" /></div>
        <p>Choose your fabric, weave, colour & occasion. Our master weavers will craft your dream garment — delivery in 4–6 weeks.</p>
      </div>
      <div className="cust-gr">
        <div>
          <div className="cust-form">
            <div className="cust-tabs">
              {steps.map((s, i) => <button key={i} className={`ctab${step === i ? ' a' : ''}`} onClick={() => i <= step && setStep(i)}>{i < step ? '✓ ' : ''}{s}</button>)}
            </div>
            <div className="prog-bar">
              <div className="prog-fill" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
            </div>

            {/* Step 0: Garment */}
            <div className={`cust-step${step === 0 ? ' a' : ''}`}>
              <div className="fg">
                <label className="fl">Garment Type *</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
                  {Object.keys(ICONS).map(g => (
                    <button key={g} className={`bopt${f.garment === g ? ' sel' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, padding: '12px 6px' }} onClick={() => set('garment', g)}>
                      <span style={{ fontSize: '1.4rem' }}>{ICONS[g]}</span><span>{g}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="fg">
                <label className="fl">Weave Style *</label>
                <select className="fsel" value={f.weave} onChange={e => set('weave', e.target.value)}>
                  {WEAVES.map(w => <option key={w}>{w}</option>)}
                </select>
              </div>
              <div className="fg">
                <label className="fl">Occasion *</label>
                <select className="fsel" value={f.occasion} onChange={e => set('occasion', e.target.value)}>
                  {OCCASIONS.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="fr">
                <div className="fg">
                  <label className="fl">Size *</label>
                  <select className="fsel" value={f.size} onChange={e => set('size', e.target.value)}>
                    {['XS','S','M','L','XL','XXL','Custom'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                {f.garment === 'Saree' && (
                  <div className="fg">
                    <label className="fl">Blouse Piece</label>
                    <select className="fsel" value={f.blouse} onChange={e => set('blouse', e.target.value)}>
                      <option value="yes">Include (+₹2,500)</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Step 1: Design */}
            <div className={`cust-step${step === 1 ? ' a' : ''}`}>
              <div className="fg">
                <label className="fl">Base Colour *</label>
                <div className="cpc-row">
                  {FABCOLS.map(c => <button key={c} className={`cpc${f.color === c ? ' sel' : ''}`} style={{ background: c }} onClick={() => set('color', c)} />)}
                </div>
              </div>
              <div className="fg">
                <label className="fl">Border Style</label>
                <div className="border-opts">
                  {BORDERS.map(b => <button key={b} className={`bopt${f.border === b ? ' sel' : ''}`} onClick={() => set('border', b)}>{b}</button>)}
                </div>
              </div>
              <div className="fg">
                <label className="fl">Primary Motif</label>
                <div className="motif-opts">
                  {MOTIFS.map(m => (
                    <button key={m} className={`mopt${f.motif === m ? ' sel' : ''}`} onClick={() => set('motif', m)}>
                      <span className="mopt-ico">{m.split(' ')[0]}</span>{m.split(' ').slice(1).join(' ')}
                    </button>
                  ))}
                </div>
              </div>
              <div className="fg">
                <label className="fl">Zari Type</label>
                <div className="zari-opts">
                  {ZARI.map(z => <button key={z} className={`zopt${f.zari === z ? ' sel' : ''}`} onClick={() => set('zari', z)}>{z}</button>)}
                </div>
              </div>
            </div>

            {/* Step 2: Details */}
            <div className={`cust-step${step === 2 ? ' a' : ''}`}>
              <div className="fg">
                <label className="fl">Special Instructions</label>
                <textarea className="fta" placeholder="Describe any specific requirements..." value={f.notes} onChange={e => set('notes', e.target.value)} />
              </div>
              <div className="fg">
                <label className="fl" style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                  <input type="checkbox" checked={f.rush} onChange={e => set('rush', e.target.checked)} style={{ accentColor: 'var(--deep-maroon)', width: 15, height: 15 }} />
                  <span>Rush Order (+₹3,000) — delivery in 2–3 weeks</span>
                </label>
              </div>
              <div style={{ background: 'rgba(184,135,42,.08)', border: '1px solid var(--border)', padding: 14 }}>
                <div style={{ fontSize: '.65rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--warm-gray)', marginBottom: 10 }}>Estimated Total</div>
                <div style={{ fontFamily: 'var(--fd)', fontSize: '1.5rem', color: 'var(--deep-maroon)' }}>₹{price.toLocaleString('en-IN')}</div>
              </div>
            </div>

            {/* Step 3: Contact */}
            <div className={`cust-step${step === 3 ? ' a' : ''}`}>
              <div className="fg">
                <label className="fl">Full Name *</label>
                <input className="fi" placeholder="Your full name" value={f.name} onChange={e => set('name', e.target.value)} />
              </div>
              <div className="fr">
                <div className="fg">
                  <label className="fl">Phone *</label>
                  <input className="fi" placeholder="+91 XXXXXXXXXX" value={f.phone} onChange={e => set('phone', e.target.value)} maxLength={13} />
                </div>
                <div className="fg">
                  <label className="fl">Email</label>
                  <input className="fi" type="email" placeholder="your@email.com" value={f.email} onChange={e => set('email', e.target.value)} />
                </div>
              </div>
            </div>

            <div className="cust-nav">
              <div className="step-dots">
                {steps.map((_, i) => <div key={i} className={`sdot${step === i ? ' a' : ''}`} />)}
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {step > 0 && <button className="btn-om" onClick={() => setStep(s => s - 1)}>← Back</button>}
                {step < steps.length - 1
                  ? <button className="btn-m" onClick={() => setStep(s => s + 1)}>Next →</button>
                  : <button className="btn-m" onClick={handleSubmit}>Submit Order ✦</button>
                }
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="cust-prev">
          <span className="prev-lbl">Live Preview</span>
          <div className="prev-garm" style={{ background: `linear-gradient(135deg,${f.color}3a,${f.color}99)` }}>
            <div className="prev-fab">
              {[...Array(6)].map((_, i) => <div key={i} className="prev-fl" style={{ background: f.color, opacity: 0.18 }} />)}
            </div>
            <span style={{ fontSize: '4.5rem', zIndex: 2 }}>{ICONS[f.garment] || '🥻'}</span>
            <div className="prev-badge">{f.weave}</div>
          </div>
          <div className="prev-dets">
            {[['Garment', f.garment],['Weave', f.weave],['Border', f.border],['Occasion', f.occasion],['Size', f.size]].map(([k, v]) => (
              <div key={k} className="prev-row"><span className="prev-k">{k}</span><span className="prev-v">{v}</span></div>
            ))}
          </div>
          <div className="prev-pr">₹{price.toLocaleString('en-IN')}</div>
          <div className="prev-pr-note">Estimated · Final on confirmation</div>
          <div className="prev-actions">
            <button className="btn-m" onClick={() => toast('Saving to wishlist...', 's', '♥')}>Save Design ♡</button>
            <button className="btn-om" onClick={() => toast('Sharing design...', 'i', '✦')}>Share Design</button>
          </div>
        </div>
      </div>
    </section>
  )
}
