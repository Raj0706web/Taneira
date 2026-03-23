import { useState } from 'react'
import { toast } from '../data.js'

export default function NlSec() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const sub = () => {
    if (!email.includes('@') || !email.includes('.')) { toast('Please enter a valid email', 'e', '⚠️'); return }
    setDone(true)
    toast('Welcome to the Taneira family!', 's', '🎉')
  }

  return (
    <section className="nl-sec">
      <div className="nl-in">
        <div className="nl-perks">
          {['Early Access','Exclusive Offers','Weaver Stories','New Arrivals'].map(p => (
            <span key={p} className="nl-perk">{p}</span>
          ))}
        </div>
        <h2 className="nl-ttl">Get <em>First Access</em></h2>
        <p className="nl-sub">New arrivals, weaver stories & exclusive offers — straight to your inbox.</p>
        {done ? (
          <div className="nl-ok">✦ You're in! Check your inbox for a welcome gift.</div>
        ) : (
          <div className="nl-fw">
            <input className="nl-fi" type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && sub()} />
            <button className="nl-fb" onClick={sub}>Subscribe</button>
          </div>
        )}
        <p className="nl-nt">No spam. We respect your inbox as much as we respect our weavers.</p>
      </div>
    </section>
  )
}
