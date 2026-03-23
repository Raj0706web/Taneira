import { useState } from 'react'
import { FOOTER_COLS, toast } from '../data.js'

// Social icons with real working URLs
const SocialIcons = [
  {
    label: 'Facebook', color: '#1877f2',
    url: 'https://www.facebook.com/TaneiraOfficial',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  },
  {
    label: 'Instagram', color: '#e1306c',
    url: 'https://www.instagram.com/taneira_official',
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
  },
  {
    label: 'Pinterest', color: '#e60023',
    url: 'https://www.pinterest.com/taneiraofficial',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
  },
  {
    label: 'YouTube', color: '#ff0000',
    url: 'https://www.youtube.com/@TaneiraOfficial',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon fill="#fff" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
  },
  {
    label: 'WhatsApp', color: '#25d366',
    url: 'https://wa.me/918047188888',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
  },
  {
    label: 'Email', color: '#b8872a',
    url: 'mailto:care@taneira.com',
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
  },
]

// Taneira store locations on Google Maps
const TANEIRA_STORES = [
  { name: 'Taneira — Khan Market, Delhi', url: 'https://maps.google.com/?q=Taneira+Khan+Market+New+Delhi' },
  { name: 'Taneira — Santacruz, Mumbai', url: 'https://maps.google.com/?q=Taneira+Santacruz+Mumbai' },
  { name: 'Taneira — Indiranagar, Bengaluru', url: 'https://maps.google.com/?q=Taneira+Indiranagar+Bengaluru' },
  { name: 'Taneira — Banjara Hills, Hyderabad', url: 'https://maps.google.com/?q=Taneira+Banjara+Hills+Hyderabad' },
  { name: 'Taneira — Alwarpet, Chennai', url: 'https://maps.google.com/?q=Taneira+Alwarpet+Chennai' },
  { name: 'Taneira — Viman Nagar, Pune', url: 'https://maps.google.com/?q=Taneira+Viman+Nagar+Pune' },
  { name: 'View All Stores on Google Maps', url: 'https://maps.google.com/?q=Taneira+stores+India', isAll: true },
]

export default function FooterSec() {
  const [fle, setFle] = useState('')
  const [openSection, setOpenSection] = useState(null)
  const [hoveredSoc, setHoveredSoc] = useState(null)

  const flSub = () => {
    if (!fle.includes('@')) { toast('Enter a valid email', 'e', '⚠️'); return }
    toast('Subscribed!', 's', '🎉')
    setFle('')
  }

  const toggleSection = (key) => setOpenSection(prev => prev === key ? null : key)

  return (
    <footer>
      {/* Main footer grid */}
      <div className="ft">
        <div>
          <span style={{ fontSize: '.54rem', letterSpacing: '.34em', color: 'rgba(212,168,75,.38)' }}>TATA</span>
          <span style={{ color: 'rgba(212,168,75,.12)', margin: '0 8px' }}>|</span>
          <span className="fl-nm">Taneira</span>
          <p className="fl-tg">Celebrating India's Handloom Heritage since 2017. A Tata Enterprise.</p>
          <div className="fl-soc">
            {['Instagram','Pinterest','Facebook','YouTube','Twitter'].map(s => (
              <span key={s} className="fsoc" onClick={() => toast(`Opening ${s}...`, 'i', '✦')}>{s}</span>
            ))}
          </div>
          <div className="fl-trust">A Tata Enterprise — Trusted Since 1868</div>
        </div>
        <div className="fl-gr">
          {FOOTER_COLS.map(col => (
            <div key={col.h} className="fl-col">
              <span className="fl-ch">{col.h}</span>
              <ul>
                {col.items.map(item => (
                  <li key={item}><span className="fl-lk" onClick={() => toast(`Opening ${item}...`, 'i', '✦')}>{item}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile accordion sections */}
      {[
        { key: 'help', label: 'NEED HELP', items: ['Size Guide','Care Instructions','Returns','Track Order','FAQs','Contact Us'] },
        { key: 'policies', label: 'OUR POLICIES', items: ['Privacy Policy','Terms of Use','Shipping Policy','Return Policy','Cookie Policy'] },
        { key: 'about', label: 'ABOUT TANEIRA', items: ['Our Story','Weaver Stories','Sustainability','Press','Careers','Store Locator'] },
      ].map(sec => (
        <div key={sec.key} style={{ borderTop: '1px solid rgba(212,168,75,.07)', borderBottom: '1px solid rgba(212,168,75,.07)' }}>
          <button
            onClick={() => toggleSection(sec.key)}
            style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 64px', background: 'none', border: 'none', color: 'var(--gold)', fontSize: '.72rem', letterSpacing: '.22em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'var(--fb)' }}
          >
            {sec.label}
            <span style={{ fontSize: '1.1rem' }}>{openSection === sec.key ? '−' : '+'}</span>
          </button>
          {openSection === sec.key && (
            <div style={{ padding: '0 64px 16px' }}>
              {sec.items.map(item => (
                <div key={item} style={{ padding: '7px 0', fontSize: '.8rem', color: 'rgba(250,246,240,.45)', cursor: 'pointer', borderBottom: '1px solid rgba(212,168,75,.06)' }} onClick={() => toast(`Opening ${item}...`, 'i', '✦')}>{item}</div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* ── STORE LOCATOR — Taneira outlets on Google Maps ── */}
      <div style={{ padding: '28px 64px', borderTop: '1px solid rgba(212,168,75,.07)', borderBottom: '1px solid rgba(212,168,75,.07)', background: 'rgba(255,255,255,.02)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Google Maps pin icon */}
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(234,67,53,.15)', border: '1px solid rgba(234,67,53,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg viewBox="0 0 24 24" fill="#ea4335" width="18" height="18"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            </div>
            <div>
              <div style={{ fontSize: '.72rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 2 }}>Find a Taneira Store</div>
              <div style={{ fontSize: '.78rem', color: 'rgba(250,246,240,.4)' }}>Visit us across India — 50+ stores nationwide</div>
            </div>
          </div>
          <a
            href="https://maps.google.com/?q=Taneira+stores+India"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 18px', border: '1px solid rgba(234,67,53,.4)', borderRadius: 2, color: '#ea4335', fontSize: '.68rem', letterSpacing: '.12em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all .2s', background: 'rgba(234,67,53,.06)', whiteSpace: 'nowrap' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(234,67,53,.16)'; e.currentTarget.style.borderColor = '#ea4335' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(234,67,53,.06)'; e.currentTarget.style.borderColor = 'rgba(234,67,53,.4)' }}
          >
            <svg viewBox="0 0 24 24" fill="#ea4335" width="13" height="13"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            View All on Maps
          </a>
        </div>

        {/* Store grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {TANEIRA_STORES.filter(s => !s.isAll).map((store, i) => (
            <a
              key={i}
              href={store.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', border: '1px solid rgba(212,168,75,.1)', borderRadius: 3, textDecoration: 'none', transition: 'all .2s', background: 'rgba(255,255,255,.03)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#ea4335'; e.currentTarget.style.background = 'rgba(234,67,53,.06)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(212,168,75,.1)'; e.currentTarget.style.background = 'rgba(255,255,255,.03)' }}
            >
              <svg viewBox="0 0 24 24" fill="rgba(234,67,53,.6)" width="12" height="12" style={{ flexShrink: 0 }}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              <span style={{ fontSize: '.72rem', color: 'rgba(250,246,240,.45)', lineHeight: 1.3 }}>{store.name.replace('Taneira — ', '')}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="rgba(212,168,75,.3)" strokeWidth="2" width="10" height="10" style={{ marginLeft: 'auto', flexShrink: 0 }}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          ))}
        </div>
      </div>

      {/* Social icons row — real working links matching screenshot */}
      <div style={{ padding: '20px 64px', borderBottom: '1px solid rgba(212,168,75,.07)', display: 'flex', alignItems: 'center', gap: 12 }}>
        {SocialIcons.map(soc => (
          <a
            key={soc.label}
            href={soc.url}
            target={soc.url.startsWith('mailto') ? '_self' : '_blank'}
            rel="noopener noreferrer"
            title={soc.label}
            onMouseEnter={() => setHoveredSoc(soc.label)}
            onMouseLeave={() => setHoveredSoc(null)}
            style={{
              width: 42, height: 42, borderRadius: '50%',
              border: `1px solid ${hoveredSoc === soc.label ? soc.color : 'rgba(212,168,75,.15)'}`,
              background: hoveredSoc === soc.label ? `${soc.color}22` : 'rgba(255,255,255,.06)',
              color: hoveredSoc === soc.label ? soc.color : 'rgba(250,246,240,.5)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all .2s', flexShrink: 0, textDecoration: 'none',
            }}
          >
            {soc.svg}
          </a>
        ))}
        {/* Divider + Google Maps store link inline */}
        <div style={{ width: 1, height: 28, background: 'rgba(212,168,75,.15)', margin: '0 6px', flexShrink: 0 }} />
        <a
          href="https://maps.google.com/?q=Taneira+stores+India"
          target="_blank"
          rel="noopener noreferrer"
          title="Find Taneira stores on Google Maps"
          onMouseEnter={() => setHoveredSoc('maps')}
          onMouseLeave={() => setHoveredSoc(null)}
          style={{
            width: 42, height: 42, borderRadius: '50%',
            border: `1px solid ${hoveredSoc === 'maps' ? '#ea4335' : 'rgba(212,168,75,.15)'}`,
            background: hoveredSoc === 'maps' ? 'rgba(234,67,53,.15)' : 'rgba(255,255,255,.06)',
            color: hoveredSoc === 'maps' ? '#ea4335' : 'rgba(250,246,240,.5)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all .2s', flexShrink: 0, textDecoration: 'none',
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
        </a>
      </div>

      {/* Payment methods */}
      <div style={{ padding: '14px 64px', borderBottom: '1px solid rgba(212,168,75,.07)', display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap', background: 'rgba(255,255,255,.03)' }}>
        <span style={{ fontSize: '.58rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(250,246,240,.2)', marginRight: 8 }}>Secure Payments</span>
        {[
          { label: 'VISA', color: '#1a1f71' },
          { label: 'Mastercard', color: '#eb001b' },
          { label: 'RuPay', color: '#016b4e' },
          { label: 'Snapmint', color: '#00b67a' },
          { label: 'PayPal', color: '#003087' },
        ].map(pm => (
          <span key={pm.label} style={{ background: '#fff', borderRadius: 3, padding: '4px 10px', fontSize: '.65rem', fontWeight: 700, color: pm.color, letterSpacing: '.04em', whiteSpace: 'nowrap' }}>{pm.label}</span>
        ))}
      </div>

      {/* Newsletter strip */}
      <div className="fm">
        <div>
          <div className="fm-ttl">Get First Access</div>
          <div className="fm-sub">New arrivals & exclusive offers</div>
        </div>
        <div className="fm-form">
          <input className="fm-in" type="email" placeholder="Your email" value={fle} onChange={e => setFle(e.target.value)} onKeyDown={e => e.key === 'Enter' && flSub()} />
          <button className="fm-btn" onClick={flSub}>Subscribe</button>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="fb">
        <span>© 2026 Taneira — A Tata Enterprise. All rights reserved.</span>
        <div className="fb-lks">
          {['Privacy Policy','Terms of Use','Sitemap','Accessibility'].map(l => (
            <span key={l} onClick={() => toast(`Opening ${l}...`, 'i', '✦')}>{l}</span>
          ))}
        </div>
      </div>
    </footer>
  )
}
