import { useState } from 'react'
import { toast } from '../data.js'
import { createOrder } from '../api/order.js'

const PAY_OPTS = [
  ['upi',        'UPI / GPay / PhonePe', '📲', 'Instant · No extra charges'],
  ['card',       'Credit / Debit Card',  '💳', 'Visa, Mastercard, RuPay'],
  ['netbanking', 'Net Banking',          '🏦', 'All major banks'],
  ['cod',        'Cash on Delivery',     '💵', 'Above ₹999'],
]

export default function CkModal({ cart, total, onClose, onOrderPlaced, onOpenDashboard }) {
  const [step, setStep]           = useState(0)           // 0=delivery 1=payment 2=success
  const [pay, setPay]             = useState('upi')
  const [processing, setProc]     = useState(false)
  const [f, setF]                 = useState({ fn:'', ln:'', email:'', phone:'', addr:'', city:'', state:'', pin:'' })
  const [orderId]                 = useState(`TAN-${Date.now().toString().slice(-6)}`)
  const sf = (k,v) => setF(p => ({ ...p, [k]: v }))
  const steps = ['Delivery','Payment','Confirm']

  /* ── validation ── */
  const validate = () => {
    if (!f.fn.trim())                              { toast('First name required','e','⚠️'); return false }
    if (!f.phone.trim()||f.phone.trim().length<10) { toast('Valid phone required','e','⚠️'); return false }
    if (!f.addr.trim())                            { toast('Address required','e','⚠️');     return false }
    if (!f.city.trim())                            { toast('City required','e','⚠️');        return false }
    if (!f.pin.trim()||f.pin.length!==6)           { toast('Valid pincode required','e','⚠️');return false }
    return true
  }

  /* ── place order → save → auto-open dashboard ── */
  const placeOrder = async () => {
    if (!validate()) return
    setProc(true)

    try {
      const shippingAddress = {
        firstName: f.fn,
        lastName: f.ln,
        email: f.email,
        phone: f.phone,
        address: f.addr,
        city: f.city,
        state: f.state,
        postalCode: f.pin,
      }

      const res = await createOrder({
        shippingAddress,
        paymentMethod: pay
      })

      setProc(false)
      toast('Payment successful! Opening your dashboard...', 's', '✅')

      // Use the returned real order ID and price
      onOrderPlaced?.({
        id: `#${res.data._id.substring(res.data._id.length - 6).toUpperCase()}`,
        _id: res.data._id,
        items: cart, // Keep frontend references for immediate UI display if needed
        total: res.data.totalPrice || total,
        name: cart.map(i => (i.product?.name || i.name)).join(', '),
        city: f.city,
        fn: f.fn,
        payMethod: pay,
        date: new Date(res.data.createdAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: 'Payment Complete ✅',
        sc: '#1e7a3a',
        sb: 'rgba(30,122,58,.1)',
        color: (cart[0]?.color || cart[0]?.product?.color || '#5c1a1a'),
        price: `₹${(res.data.totalPrice || total).toLocaleString('en-IN')}`,
      })

      setTimeout(() => {
        onOpenDashboard?.()
      }, 1500)

    } catch (err) {
      setProc(false)
      toast(err.response?.data?.message || 'Failed to place order', 'e', '⚠️')
    }
  }

  /* ── close btn ── */
  const Xbtn = () => (
    <button onClick={onClose} style={{ position:'absolute',top:14,right:14,width:34,height:34,borderRadius:'50%',background:'rgba(92,26,26,.08)',border:'none',fontSize:'.9rem',color:'var(--warm-gray)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',zIndex:5,transition:'all .2s' }}
      onMouseEnter={e=>{e.currentTarget.style.background='var(--deep-maroon)';e.currentTarget.style.color='#fff'}}
      onMouseLeave={e=>{e.currentTarget.style.background='rgba(92,26,26,.08)';e.currentTarget.style.color='var(--warm-gray)'}}>✕</button>
  )

  /* ══════════════════════════════
     STEP 2 — SUCCESS SCREEN
  ══════════════════════════════ */
  if (step === 2) return (
    <div style={{ background:'var(--ivory)',width:'100%',maxWidth:640,borderRadius:8,overflow:'hidden',position:'relative',boxShadow:'0 32px 80px rgba(0,0,0,.5)',maxHeight:'90vh',overflowY:'auto' }}>
      <Xbtn />

      {/* Green success header */}
      <div style={{ background:'linear-gradient(135deg,#1e7a3a,#27a34e)',padding:'36px 40px 28px',textAlign:'center' }}>
        <div style={{ width:72,height:72,borderRadius:'50%',background:'rgba(255,255,255,.2)',border:'2px solid rgba(255,255,255,.5)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px' }}>
          <svg viewBox="0 0 52 52" fill="none" width="40" height="40">
            <path d="M14 26l9 9 15-15" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{ fontSize:'1.6rem',fontFamily:'var(--fd)',color:'#fff',marginBottom:6 }}>Payment Successful!</div>
        <div style={{ fontSize:'.82rem',color:'rgba(255,255,255,.8)' }}>Your order is confirmed. Estimated delivery: 3–5 business days.</div>
      </div>

      {/* Order summary box */}
      <div style={{ padding:'28px 40px' }}>
        {/* Order ID + meta */}
        <div style={{ background:'var(--blush)',border:'1px solid var(--border)',borderRadius:6,padding:'18px 22px',marginBottom:24 }}>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:16 }}>
            <div>
              <div style={{ fontSize:'.6rem',letterSpacing:'.16em',textTransform:'uppercase',color:'var(--warm-gray)',marginBottom:4 }}>Order ID</div>
              <div style={{ fontFamily:'var(--fd)',fontSize:'1.15rem',color:'var(--deep-maroon)',fontWeight:500 }}>{orderId}</div>
            </div>
            <div>
              <div style={{ fontSize:'.6rem',letterSpacing:'.16em',textTransform:'uppercase',color:'var(--warm-gray)',marginBottom:4 }}>Amount Paid</div>
              <div style={{ fontFamily:'var(--fd)',fontSize:'1.15rem',color:'#1e7a3a',fontWeight:500 }}>₹{total.toLocaleString('en-IN')}</div>
            </div>
            <div>
              <div style={{ fontSize:'.6rem',letterSpacing:'.16em',textTransform:'uppercase',color:'var(--warm-gray)',marginBottom:4 }}>Payment Via</div>
              <div style={{ fontSize:'.82rem',fontWeight:600,color:'var(--charcoal)',textTransform:'uppercase',marginTop:4 }}>{pay}</div>
            </div>
          </div>
          <div style={{ borderTop:'1px solid var(--border)',marginTop:14,paddingTop:12,display:'flex',justifyContent:'space-between',alignItems:'center' }}>
            <span style={{ fontSize:'.76rem',color:'var(--warm-gray)' }}>Delivery to: <strong style={{ color:'var(--charcoal)' }}>{f.fn} {f.ln} · {f.city}</strong></span>
            <span style={{ display:'inline-flex',alignItems:'center',gap:5,fontSize:'.72rem',color:'#1e7a3a',fontWeight:600 }}>
              <span style={{ width:8,height:8,borderRadius:'50%',background:'#1e7a3a',display:'inline-block' }}/>
              Payment Complete ✅
            </span>
          </div>
        </div>

        {/* Items */}
        <div style={{ marginBottom:20 }}>
          <div style={{ fontSize:'.62rem',letterSpacing:'.16em',textTransform:'uppercase',color:'var(--warm-gray)',marginBottom:10 }}>Items Ordered</div>
          {cart.map((item,i) => {
            const p = item.product || item;
            const qty = item.quantity || item.qty || 1;
            const price = p.price || item.price || 0;
            return (
              <div key={i} style={{ display:'flex',alignItems:'center',gap:12,padding:'10px 0',borderBottom:'1px solid var(--border)' }}>
                <div style={{ width:40,height:48,borderRadius:4,background:`linear-gradient(135deg,${item.color||p.color||'#5c1a1a'}33,${item.color||p.color||'#5c1a1a'}88)`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.1rem',flexShrink:0,overflow:'hidden' }}>
                   {(p.image || (p.images && p.images[0])) ? <img src={p.image || p.images[0]} alt={p.name || item.name} style={{width:'100%',height:'100%',objectFit:'cover'}} /> : (item.icon||'🥻')}
                </div>
                <div style={{ flex:1,minWidth:0 }}>
                  <div style={{ fontSize:'.84rem',fontWeight:500,color:'var(--charcoal)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis' }}>{p.name || item.name}</div>
                  <div style={{ fontSize:'.7rem',color:'var(--warm-gray)',marginTop:2 }}>
                    {(p.weave || item.weave) && `${p.weave || item.weave}`}{item.size && ` · Size: ${item.size}`} · Qty: {qty}
                  </div>
                </div>
                <div style={{ fontSize:'.9rem',fontWeight:500,color:'var(--deep-maroon)',flexShrink:0 }}>₹{(price * qty).toLocaleString('en-IN')}</div>
              </div>
            );
          })}
          <div style={{ display:'flex',justifyContent:'space-between',padding:'12px 0',fontFamily:'var(--fd)',fontSize:'1.05rem',color:'var(--deep-maroon)' }}>
            <span>Total Paid</span>
            <span>₹{total.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Delivery notice */}
        <div style={{ background:'rgba(30,122,58,.07)',border:'1px solid rgba(30,122,58,.2)',borderRadius:6,padding:'12px 16px',marginBottom:24,display:'flex',alignItems:'flex-start',gap:10 }}>
          <span style={{ fontSize:'1.1rem',flexShrink:0 }}>📦</span>
          <div style={{ fontSize:'.78rem',color:'#1e7a3a',lineHeight:1.6 }}>
            <strong>Your order is on its way!</strong> Estimated delivery in 3–5 business days.<br/>
            A tracking link will be sent to your phone &amp; email once dispatched.
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display:'flex',gap:12 }}>
          <button
            onClick={() => { onOpenDashboard?.() }}
            style={{ flex:1,padding:'14px',background:'var(--deep-maroon)',color:'var(--gold-light)',border:'none',borderRadius:4,fontSize:'.76rem',letterSpacing:'.16em',textTransform:'uppercase',cursor:'pointer',fontFamily:'var(--fb)',display:'flex',alignItems:'center',justifyContent:'center',gap:8 }}
          >
            📦 Track My Order
          </button>
          <button
            onClick={onClose}
            style={{ flex:1,padding:'14px',background:'none',color:'var(--charcoal)',border:'1px solid var(--border)',borderRadius:4,fontSize:'.76rem',letterSpacing:'.16em',textTransform:'uppercase',cursor:'pointer',fontFamily:'var(--fb)' }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )

  /* ══════════════════════════════
     STEP 0 — DELIVERY
  ══════════════════════════════ */
  if (step === 0) return (
    <div className="ckm" style={{ position:'relative',maxHeight:'90vh',overflowY:'auto' }}>
      <Xbtn />
      <div className="ckf">
        <h2>Checkout</h2>
        <span className="ckf-sub">
          {steps.map((s,i) => (
            <span key={i} style={{ color: step===i?'var(--deep-maroon)':step>i?'var(--green)':'var(--warm-gray)',marginRight:8 }}>
              {step>i?'✓ ':''}{s}
            </span>
          ))}
        </span>
        <div className="prog-bar"><div className="prog-fill" style={{ width:'33%' }}/></div>
        <div className="ck-sec">
          <span className="ck-sec-ttl">Delivery Address</span>
          <div className="ck-fields ck-2col">
            <input className="fi" placeholder="First Name *"  value={f.fn}    onChange={e=>sf('fn',e.target.value)} />
            <input className="fi" placeholder="Last Name"     value={f.ln}    onChange={e=>sf('ln',e.target.value)} />
            <input className="fi" placeholder="Email"         value={f.email} onChange={e=>sf('email',e.target.value)} />
            <input className="fi" placeholder="Phone *"       value={f.phone} onChange={e=>sf('phone',e.target.value)} />
          </div>
          <div className="ck-fields" style={{ marginTop:10 }}>
            <input className="fi" placeholder="Address *" value={f.addr} onChange={e=>sf('addr',e.target.value)} />
            <div className="ck-fields ck-2col" style={{ marginTop:10 }}>
              <input className="fi" placeholder="City *"    value={f.city}  onChange={e=>sf('city',e.target.value)} />
              <input className="fi" placeholder="State"     value={f.state} onChange={e=>sf('state',e.target.value)} />
              <input className="fi" placeholder="Pincode *" value={f.pin}   maxLength={6} onChange={e=>sf('pin',e.target.value.replace(/\D/g,''))} />
            </div>
          </div>
        </div>
        <button className="ck-pb" onClick={() => { if(validate()) setStep(1) }}>Continue to Payment →</button>
        <div className="ck-secure">🔒 Secured by 256-bit SSL</div>
      </div>
      <div className="cks">
        <h3>Order Summary</h3>
        {cart.map((item, i) => {
          const p = item.product || item;
          const qty = item.quantity || item.qty || 1;
          const price = p.price || item.price || 0;
          const key = item._id || item.key || item.id || i;
          return (
            <div key={key} className="ck-item" style={{display:'flex', alignItems:'center', gap: 12, marginBottom:12}}>
              <span className="ck-item-ico" style={{ width:40, height:52, flexShrink:0, borderRadius: 4, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background:'var(--blush)' }}>
                {(p.image || (p.images && p.images[0])) ? <img src={p.image || p.images[0]} alt={p.name || item.name} style={{width:'100%',height:'100%',objectFit:'cover'}} /> : (item.icon||'🥻')}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span className="ck-item-nm" style={{ display:'block', fontSize:'.85rem', fontWeight:500, color:'var(--charcoal)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                  {(p.name || item.name)}
                </span>
                <span style={{ color:'var(--warm-gray)', fontSize:'.72rem' }}>Qty: {qty}</span>
              </div>
              <span className="ck-item-pr" style={{ fontWeight: 600, color: 'var(--deep-maroon)', fontSize: '.9rem' }}>₹{(price * qty).toLocaleString('en-IN')}</span>
            </div>
          );
        })}
        <div className="ck-tot-rows">
          <div className="sr"><span>Subtotal</span><span>₹{total.toLocaleString('en-IN')}</span></div>
          <div className="sr fs"><span>Shipping</span><span style={{ color:'var(--green)' }}>Free</span></div>
          <div className="sr tot"><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div>
        </div>
      </div>
    </div>
  )

  /* ══════════════════════════════
     STEP 1 — PAYMENT
  ══════════════════════════════ */
  return (
    <div className="ckm" style={{ position:'relative',maxHeight:'90vh',overflowY:'auto' }}>
      <Xbtn />
      <div className="ckf">
        <h2>Checkout</h2>
        <span className="ckf-sub">
          {steps.map((s,i) => (
            <span key={i} style={{ color: step===i?'var(--deep-maroon)':step>i?'var(--green)':'var(--warm-gray)',marginRight:8 }}>
              {step>i?'✓ ':''}{s}
            </span>
          ))}
        </span>
        <div className="prog-bar"><div className="prog-fill" style={{ width:'66%' }}/></div>
        <div className="ck-sec">
          <span className="ck-sec-ttl">Payment Method</span>
          <div className="pay-opts">
            {PAY_OPTS.map(([v,lbl,ico,sub]) => (
              <button key={v} className={`po${pay===v?' sel':''}`} onClick={()=>setPay(v)}>
                <span className="po-ico">{ico}</span>
                <span className="po-txt"><span className="po-nm">{lbl}</span><span className="po-sub">{sub}</span></span>
                {pay===v && <span style={{ color:'var(--gold)' }}>✓</span>}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display:'flex',gap:10 }}>
          <button className="btn-om" onClick={()=>setStep(0)}>← Back</button>
          <button
            className="ck-pb"
            style={{ flex:1,marginTop:0,display:'flex',alignItems:'center',justifyContent:'center',gap:10,opacity:processing?.8:1 }}
            onClick={placeOrder}
            disabled={processing}
          >
            {processing
              ? <><span style={{ width:18,height:18,border:'2px solid rgba(212,168,75,.3)',borderTopColor:'var(--gold-light)',borderRadius:'50%',animation:'spin .7s linear infinite',display:'inline-block' }}/> Processing...</>
              : `Place Order — ₹${total.toLocaleString('en-IN')}`
            }
          </button>
        </div>
        <div className="ck-secure">🔒 Your payment is 100% secure</div>
      </div>
      <div className="cks">
        <h3>Order Summary</h3>
        {cart.map((item, i) => {
          const p = item.product || item;
          const qty = item.quantity || item.qty || 1;
          const price = p.price || item.price || 0;
          const key = item._id || item.key || item.id || i;
          return (
            <div key={key} className="ck-item" style={{display:'flex', alignItems:'center', gap: 12, marginBottom:12}}>
              <span className="ck-item-ico" style={{ width:40, height:52, flexShrink:0, borderRadius: 4, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background:'var(--blush)' }}>
                {(p.image || (p.images && p.images[0])) ? <img src={p.image || p.images[0]} alt={p.name || item.name} style={{width:'100%',height:'100%',objectFit:'cover'}} /> : (item.icon||'🥻')}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span className="ck-item-nm" style={{ display:'block', fontSize:'.85rem', fontWeight:500, color:'var(--charcoal)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                  {(p.name || item.name)}
                </span>
                <span style={{ color:'var(--warm-gray)', fontSize:'.72rem' }}>Qty: {qty}</span>
              </div>
              <span className="ck-item-pr" style={{ fontWeight: 600, color: 'var(--deep-maroon)', fontSize: '.9rem' }}>₹{(price * qty).toLocaleString('en-IN')}</span>
            </div>
          );
        })}
        <div className="ck-tot-rows">
          <div className="sr"><span>Subtotal</span><span>₹{total.toLocaleString('en-IN')}</span></div>
          <div className="sr fs"><span>Shipping</span><span style={{ color:'var(--green)' }}>Free</span></div>
          <div className="sr tot"><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div>
        </div>
        <div style={{ marginTop:16,padding:'10px 12px',background:'rgba(184,135,42,.06)',border:'1px solid var(--border)',borderRadius:3,fontSize:'.7rem',color:'var(--warm-gray)',lineHeight:1.6 }}>
          🔒 Payments secured by Razorpay<br/>
          ✦ GI-certified handloom products<br/>
          📦 Free shipping · COD available
        </div>
      </div>
    </div>
  )
}