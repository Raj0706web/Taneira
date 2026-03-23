import { useState } from 'react'
import { toast } from '../data.js'

const INITIAL_REVIEWS = [
  { name: 'Priya Sharma', city: 'Mumbai', rating: 5, text: "The Banarasi saree for my daughter's wedding was breathtaking. Zari work is exquisite.", product: 'Kadhua Banarasi Silk' },
  { name: 'Ananya Krishnan', city: 'Bengaluru', rating: 5, text: "I've bought Kanjivaram sarees for 20 years. Taneira's quality rivals the best in Kanchipuram.", product: 'Kanjivaram Temple Border' },
  { name: 'Meena Patel', city: 'Ahmedabad', rating: 5, text: 'The Bandhani dupatta was a work of art. Packaging was luxurious, delivery on time.', product: 'Bandhani Silk Dupatta' },
  { name: 'Raksha Nair', city: 'Kochi', rating: 5, text: 'Finally a brand that pays weavers fairly. The Paithani saree is my prized possession.', product: 'Paithani Festive Saree' },
]

export default function TstSec() {
  const [active, setActive] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [newRev, setNewRev] = useState({ name: '', rating: 5, text: '', product: '' })
  const [reviews, setReviews] = useState(INITIAL_REVIEWS)

  const submitReview = () => {
    if (!newRev.name.trim() || !newRev.text.trim()) { toast('Please fill your name and review', 'e', '⚠️'); return }
    setReviews(p => [...p, { ...newRev, city: 'India' }])
    toast('Thank you for your review!', 's', '⭐')
    setShowForm(false)
    setNewRev({ name: '', rating: 5, text: '', product: '' })
  }

  return (
    <section className="tsts">
      <div className="tst-hd">
        <span className="sec-pre">Customer Love</span>
        <h2 className="sec-ttl">Stories from Our Patrons</h2>
      </div>
      <div className="tst-gr">
        {reviews.slice(0, 4).map((r, i) => (
          <div key={i} className={`tc${i === active ? ' a' : ''}`} onClick={() => setActive(i)}>
            <div className="tst-sts">{'★'.repeat(r.rating)}</div>
            <p className="tst-q">"{r.text}"</p>
            <div className="tst-rv">
              <div className="tst-av">{r.name[0]}</div>
              <div>
                <p className="tst-nm">{r.name}</p>
                <p className="tst-mt">{r.city} · {r.product}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="tst-dots">
        {reviews.slice(0, 4).map((_, i) => <button key={i} className={`tdot${i === active ? ' a' : ''}`} onClick={() => setActive(i)} />)}
      </div>
      {!showForm ? (
        <div style={{ marginTop: 28 }}>
          <button className="write-review-btn btn-om" onClick={() => setShowForm(true)}>✍️ Write a Review</button>
        </div>
      ) : (
        <div style={{ maxWidth: 560, margin: '28px auto 0', background: 'var(--ivory)', border: '1px solid var(--border)', padding: 28, textAlign: 'left' }}>
          <div style={{ fontFamily: 'var(--fd)', fontSize: '1.2rem', color: 'var(--deep-maroon)', marginBottom: 18 }}>Share Your Experience</div>
          <div className="fg">
            <label className="fl">Your Name *</label>
            <input className="fi" placeholder="Full name" value={newRev.name} onChange={e => setNewRev(p => ({ ...p, name: e.target.value }))} />
          </div>
          <div className="fg">
            <label className="fl">Product</label>
            <input className="fi" placeholder="Which product?" value={newRev.product} onChange={e => setNewRev(p => ({ ...p, product: e.target.value }))} />
          </div>
          <div className="fg">
            <label className="fl">Rating</label>
            <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
              {[1,2,3,4,5].map(r => (
                <button key={r} style={{ background: 'none', border: 'none', fontSize: '1.4rem', color: r <= newRev.rating ? 'var(--gold)' : 'var(--border)', cursor: 'pointer' }} onClick={() => setNewRev(p => ({ ...p, rating: r }))}>★</button>
              ))}
            </div>
          </div>
          <div className="fg">
            <label className="fl">Your Review *</label>
            <textarea className="fta" placeholder="Share your experience..." value={newRev.text} onChange={e => setNewRev(p => ({ ...p, text: e.target.value }))} />
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <button className="btn-m" onClick={submitReview}>Submit Review</button>
            <button className="btn-om" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}
    </section>
  )
}
