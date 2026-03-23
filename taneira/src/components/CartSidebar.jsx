import { useState } from 'react'
import { toast } from '../data.js'

const COUPONS = { TANEIRA10: 10, WEAVE15: 15, FIRST20: 20, TATA5: 5 }

export default function CartSide({ open, cart, total, onClose, onRemove, onQty, onCheckout }) {
  const [coupon, setCoupon] = useState('')
  const [disc, setDisc] = useState(0)
  const [couponErr, setCouponErr] = useState('')

  const applyC = () => {
    const pct = COUPONS[coupon.toUpperCase()]
    if (pct) {
      setDisc(pct)
      setCouponErr('')
      toast(`${pct}% off applied!`, 's', '🎉')
    } else {
      setCouponErr('Invalid. Try TANEIRA10 / WEAVE15 / FIRST20 / TATA5')
      setDisc(0)
    }
  }

  const discAmt = Math.round((total * disc) / 100)
  const final = total - discAmt

  return (
    <div className={`cs${open ? ' o' : ''}`}>
      <div className="cs-hd">
        <div>
          <h2 className="cs-ttl">Your Bag</h2>
          <span className="cs-sub">{cart.length} item{cart.length !== 1 ? 's' : ''} · ₹{total.toLocaleString('en-IN')}</span>
        </div>
        <button className="cs-cl" onClick={onClose}>✕</button>
      </div>

      {cart.length === 0 ? (
        <div className="cs-empty">
          <span className="ce-ico">🛍️</span>
          <h3 className="ce-ttl">Your bag is empty</h3>
          <p className="ce-sub">Explore our handloom collection</p>
          <button className="btn-m" style={{ marginTop: 12 }} onClick={onClose}>Shop Now</button>
        </div>
      ) : (
        <>
          <div className="cs-il">
            {cart.map(item => {
              const p = item.product || item;
              const name = p.name || 'Unknown Product';
              const price = p.price || 0;
              const image = p.image || p.images?.[0];
              const weave = p.weave || 'Exclusive';
              const qty = item.qty || item.quantity || 1;
              const color = item.color || p.color || '#8B1A1A';
              const key = item._id || item.key || item.id || Math.random().toString();
              const size = item.size || '';
              const pid = p._id || p.id || (typeof p === 'string' ? p : '');
              
              return (
                <div key={key} className="ci">
                  <div className="ci-th" style={{ background: `linear-gradient(135deg,${color}44,${color}88)` }}>
                    {image ? (
                      <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      p.icon || '🥻'
                    )}
                  </div>
                  <div className="ci-inf">
                    <span className="ci-wv">{weave}</span>
                    <p className="ci-nm" title={name}>{name}</p>
                    {size && <p className="ci-mt">Size: {size}</p>}
                    <p className="ci-pr">₹{(price * qty).toLocaleString('en-IN')}</p>
                    <div className="ciq">
                      <button className="ciqb" onClick={() => onQty(pid, color, size, -1, qty)}>−</button>
                      <span className="ciqv">{qty}</span>
                      <button className="ciqb" onClick={() => onQty(pid, color, size, 1, qty)}>+</button>
                    </div>
                  </div>
                  <button className="ci-rm" onClick={() => onRemove(pid, color, size)}>✕ Remove</button>
                </div>
              );
            })}
          </div>

          <div className="cs-coupon">
            <div className="coupon-row">
              <input
                className="coup-i"
                placeholder="Coupon code (e.g. TANEIRA10)"
                value={coupon}
                onChange={e => { setCoupon(e.target.value); setCouponErr('') }}
                onKeyDown={e => e.key === 'Enter' && applyC()}
              />
              <button className="coup-b" onClick={applyC}>{disc > 0 ? '✓ Applied' : 'Apply'}</button>
            </div>
            {couponErr && <p className="coup-er">{couponErr}</p>}
            {disc > 0 && <p className="coup-ok">✓ {disc}% discount — saving ₹{discAmt.toLocaleString('en-IN')}!</p>}
            {!disc && !couponErr && <p className="coup-ht">Try: TANEIRA10 · WEAVE15 · FIRST20 · TATA5</p>}
          </div>

          <div className="cs-sum">
            <div className="sr"><span>Subtotal</span><span>₹{total.toLocaleString('en-IN')}</span></div>
            {disc > 0 && <div className="sr dc"><span>Discount ({disc}%)</span><span>−₹{discAmt.toLocaleString('en-IN')}</span></div>}
            <div className="sr fs"><span>Shipping</span><span>Free</span></div>
            <div className="sr tot"><span>Total</span><span>₹{final.toLocaleString('en-IN')}</span></div>
          </div>

          <button className="cs-ckb" onClick={onCheckout}>Proceed to Checkout →</button>
          <span className="cs-cnt" onClick={onClose}>← Continue Shopping</span>
        </>
      )}
    </div>
  )
}
