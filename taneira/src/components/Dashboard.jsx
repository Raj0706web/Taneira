import { useState, useEffect } from 'react'
import { toast } from '../data.js'
import { getMyOrders } from '../api/order.js'
import { getWishlist } from '../api/wishlist.js'
import './Dashboard.css'

function StatusBadge({ status }) {
  const isDelivered = status === 'Delivered'
  const isShipped = status === 'Shipped'
  const isProcessing = status === 'Processing'
  const isPayment = status && status.includes('Payment Complete')
  const cls = isDelivered ? 'badge-delivered' : isShipped ? 'badge-shipped' : isProcessing ? 'badge-processing' : isPayment ? 'badge-payment' : 'badge-default'
  return (
    <span className={`db-badge ${cls}`}>
      {isPayment && '✅ '}{isDelivered && '📦 '}{isShipped && '🚚 '}{isProcessing && '⚙️ '}{status}
    </span>
  )
}

const PROGRESS_STEPS = ['Placed', 'Confirmed', 'Processing', 'Shipped', 'Delivered']
const PROGRESS_ICONS = ['🛍', '💳', '⚙️', '🚚', '📦']

function getProgressIdx(status) {
  if (status === 'Delivered') return 4
  if (status === 'Shipped') return 3
  if (status && status.includes('Payment Complete')) return 2
  if (status === 'Processing') return 2
  return 1
}

function getETA(status, date) {
  if (status === 'Delivered') return `Delivered on ${date}`
  if (status === 'Shipped') return 'Expected in 1–2 business days'
  if (status === 'Processing') return 'Expected in 3–5 business days'
  if (status && status.includes('Payment Complete')) return 'Expected in 5–7 business days'
  return 'Estimated 5–7 business days'
}

function OrderRow({ o, onTrack }) {
  const [expanded, setExpanded] = useState(false)
  const progressIdx = getProgressIdx(o.status)
  const isDelivered = o.status === 'Delivered'
  const canTrack = o.status === 'Shipped' || o.status === 'Processing' || (o.status && o.status.includes('Payment Complete'))

  return (
    <div className={`db-order-card${expanded ? ' expanded' : ''}`}>
      {/* ── Top Row ── */}
      <div className="db-order-top" onClick={() => setExpanded(e => !e)}>
        <div className="db-order-dot" style={{ background: o.color }} />
        <div className="db-order-info">
          <div className="db-order-name">{o.name}</div>
          <div className="db-order-meta">{o.id} · {o.date}</div>
        </div>
        <div className="db-order-right">
          <StatusBadge status={o.status} />
          <span className="db-order-price">{o.price}</span>
        </div>
        <span className={`db-order-chevron${expanded ? ' open' : ''}`}>›</span>
      </div>

      {/* ── Expanded Detail Panel ── */}
      {expanded && (
        <div className="db-order-detail">

          {/* Progress Bar */}
          <div className="db-progress-section">
            <div className="db-progress-track">
              <div className="db-progress-fill" style={{ width: `${(progressIdx / 4) * 100}%` }} />
            </div>
            <div className="db-progress-steps">
              {PROGRESS_STEPS.map((step, i) => (
                <div key={i} className={`db-prog-step${i <= progressIdx ? ' done' : ''}${i === progressIdx ? ' active' : ''}`}>
                  <div className="db-prog-dot">
                    {i < progressIdx ? '✓' : PROGRESS_ICONS[i]}
                  </div>
                  <span className="db-prog-label">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Info Grid */}
          <div className="db-order-info-grid">
            <div className="db-order-info-cell">
              <span className="db-info-label">Order ID</span>
              <span className="db-info-val mono">{o.id}</span>
            </div>
            <div className="db-order-info-cell">
              <span className="db-info-label">Order Date</span>
              <span className="db-info-val">{o.date}</span>
            </div>
            <div className="db-order-info-cell">
              <span className="db-info-label">Amount Paid</span>
              <span className="db-info-val price">{o.price}</span>
            </div>
            <div className="db-order-info-cell">
              <span className="db-info-label">Payment Status</span>
              <span className="db-info-val green">✅ Confirmed</span>
            </div>
            <div className="db-order-info-cell wide">
              <span className="db-info-label">Delivery Estimate</span>
              <span className={`db-info-val${isDelivered ? ' green' : ''}`}>
                {isDelivered ? '✅' : '🚚'} {getETA(o.status, o.date)}
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="db-order-actions">
            {canTrack && (
              <button className="db-action-btn primary" onClick={(e) => { e.stopPropagation(); onTrack(o) }}>
                <span>📍</span> Track Order
              </button>
            )}
            {isDelivered && (
              <button className="db-action-btn success">
                <span>⭐</span> Write a Review
              </button>
            )}
            <button className="db-action-btn ghost">
              <span>📄</span> Download Invoice
            </button>
            <button className="db-action-btn ghost">
              <span>↩️</span> Return / Exchange
            </button>
          </div>

        </div>
      )}
    </div>
  )
}

function WishCard({ w, large }) {
  const imgSrc = w.image || (w.images && w.images[0]);
  return (
    <div className="db-wish-card">
      <div className={`db-wish-img${large ? ' large' : ''}`} style={{ background: imgSrc ? 'var(--blush)' : `linear-gradient(135deg,${w.color||'#5c1a1a'},#1a0a0a)`, overflow: 'hidden', position: 'relative' }}>
        {imgSrc ? (
          <img src={imgSrc} alt={w.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span className="db-wish-heart">♡</span>
        )}
      </div>
      <div className="db-wish-body">
        <div className="db-wish-name">{w.name}</div>
        <div className="db-wish-weave">{w.weave}</div>
        <div className="db-wish-price">{typeof w.price === 'number' ? `₹${w.price.toLocaleString('en-IN')}` : w.price}</div>
      </div>
      <button className="db-wish-btn">View Details</button>
    </div>
  )
}

function TrackModal({ order, onClose }) {
  const stages = [
    { label: 'Order Placed', icon: '✅' },
    { label: 'Payment Confirmed', icon: '💳' },
    { label: 'Processing', icon: '⚙️' },
    { label: 'Shipped', icon: '🚚' },
    { label: 'Delivered', icon: '📦' },
  ]
  const currentIdx = order.status === 'Delivered' ? 4 : order.status === 'Shipped' ? 3 : order.status?.includes('Payment Complete') ? 1 : 2

  return (
    <div className="db-track-overlay">
      <div className="db-track-modal">
        <button className="db-track-close" onClick={onClose}>✕</button>
        <div className="db-track-header">
          <div className="db-track-eyebrow">Tracking</div>
          <h3 className="db-track-id">{order.id}</h3>
          <div className="db-track-name">{order.name}</div>
        </div>
        <div className="db-track-timeline">
          <div className="db-track-line" />
          {stages.map((s, i) => {
            const active = i === currentIdx
            const done = i < currentIdx
            return (
              <div key={i} className={`db-track-step${active ? ' active' : ''}${done ? ' done' : ''}`}>
                <div className="db-track-dot">{done ? '✓' : active ? '◉' : '○'}</div>
                <div className="db-track-step-body">
                  <div className="db-track-step-label">{s.icon} {s.label}</div>
                  {active && <div className="db-track-step-current">Current status</div>}
                  {done && i === 1 && <div className="db-track-step-date">{order.date}</div>}
                </div>
              </div>
            )
          })}
        </div>
        <div className="db-track-footer">
          <div className="db-track-eta">Est. delivery: <strong>3–5 business days from order date</strong></div>
          <button className="db-track-close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

const NAV_ITEMS = [['overview','⊞','Overview'],['orders','◻','Orders'],['wishlist','♡','Wishlist'],['profile','◯','Profile']]
const PROFILE_FIELDS = (user, totalPoints) => {
  const joinDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "Mar '26"
  return [
    ['👤','Full Name',user?.name],
    ['🏷','Username','@'+(user?.username||user?.name?.toLowerCase()?.replace(/\s+/g,''))],
    ['✦','Member Status','Heritage Member'],
    ['🎖','Loyalty Points',`${totalPoints || 0} pts`],
    ['📅','Member Since', joinDate],
    ['🪡','Preferred Style','Sarees & Kurtas']
  ]
}

export default function DashboardPage({ user, onClose, onLogout, newOrders = [] }) {
  const [tab, setTab] = useState(newOrders.length > 0 ? 'orders' : 'overview')
  const [trackingOrder, setTrackingOrder] = useState(null)
  
  const [orders, setOrders] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [ordersRes, wishRes] = await Promise.all([
          getMyOrders(),
          getWishlist()
        ])
        
        const fetchedOrders = (ordersRes.data || []).map(o => ({
          ...o,
          _id: o._id,
          id: `#${o._id.substring(o._id.length - 6).toUpperCase()}`,
          date: new Date(o.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
          status: o.status || (o.isDelivered ? 'Delivered' : o.isPaid ? 'Payment Complete' : 'Processing'),
          price: `₹${o.totalPrice?.toLocaleString('en-IN') || o.price}`,
          name: o.orderItems?.[0]?.name || o.name || 'Taneira Order',
          color: o.orderItems?.[0]?.color || o.color || '#5c1a1a',
          items: o.orderItems || []
        }))
        
        const fetchedWishlist = (wishRes.data?.products || []).map(w => ({
          ...w,
          id: w._id,
        }))

        setOrders(fetchedOrders)
        setWishlist(fetchedWishlist)
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err)
      } finally {
        setLoading(false)
      }
    }
    
    // axios interceptor uses localStorage automatically, but check user state anyway
    if (user && localStorage.getItem("user")) {
      fetchData()
    } else {
      setLoading(false)
    }
  }, [user])

  const initial = user?.name?.[0]?.toUpperCase() || 'U'
  
  const allOrdersMap = new Map()
  ;[...orders, ...newOrders].forEach(o => {
    if (o._id) allOrdersMap.set(o._id, o)
    else allOrdersMap.set(o.id, o)
  })
  const allOrders = Array.from(allOrdersMap.values())

  const totalSpent = allOrders.reduce((sum, o) => sum + parseInt(String(o.price || '0').replace(/\D/g, '') || 0), 0)
  const calculatedPoints = Math.floor(totalSpent / 100)
  const joinDateShort = user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }) : "Mar '26"

  const statsData = [
    ['🛍', String(allOrders.length), 'Orders Placed'],
    ['❤', String(wishlist.length), 'Wishlist Items'],
    ['✦', String(calculatedPoints), 'Loyalty Points'],
    ["🏛", joinDateShort, 'Member Since'],
  ]

  const SectionHdr = ({ label, actionLabel, actionFn }) => (
    <div className="db-section-hdr">
      <span className="db-section-title">{label}</span>
      {actionFn && <button className="db-section-action" onClick={actionFn}>{actionLabel}</button>}
    </div>
  )

  return (
    <>
      {trackingOrder && <TrackModal order={trackingOrder} onClose={() => setTrackingOrder(null)} />}
      <div className="db-root">

        {/* SIDEBAR */}
        <aside className="db-sidebar">
          <div className="db-brand">
            <span className="db-brand-tata">TATA</span>
            <span className="db-brand-sep">|</span>
            <div>
              <div className="db-brand-name">Taneira</div>
              <div className="db-brand-tagline">Handloom Heritage</div>
            </div>
          </div>

          <div className="db-user-card">
            <div className="db-user-avatar">{initial}</div>
            <div>
              <div className="db-user-name">{user?.name}</div>
              <div className="db-user-tier">Heritage Member</div>
            </div>
          </div>

          <div className="db-divider" />

          <nav className="db-nav">
            {NAV_ITEMS.map(([id, ico, label]) => (
              <button key={id} onClick={() => setTab(id)} className={`db-nav-btn${tab === id ? ' active' : ''}`}>
                <span className="db-nav-ico">{ico}</span>
                <span>{label}</span>
                {id === 'orders' && newOrders.length > 0 && (
                  <span className="db-nav-badge">{newOrders.length}</span>
                )}
              </button>
            ))}
          </nav>

          <div className="db-sidebar-footer">
            <div className="db-divider" style={{margin:'0 0 12px'}} />
            <button className="db-footer-link" onClick={onClose}>← Back to Store</button>
            <button className="db-footer-link" onClick={onLogout}>↗ Log Out</button>
          </div>
        </aside>

        {/* MAIN */}
        <main className="db-main">
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', opacity: 0.6 }}>Loading dashboard data...</div>
          ) : (
            <>
          {tab === 'overview' && (
            <div className="db-tab-content">
              <div className="db-page-head">
                <div>
                  <span className="db-eyebrow">Member Dashboard</span>
                  <h1 className="db-page-title">Welcome back, {user?.name} <span className="db-sparkle">✦</span></h1>
                </div>
                <span className="db-heritage-tag">Heritage Member</span>
              </div>

              {newOrders.length > 0 && (
                <div className="db-success-card">
                  <div className="db-success-top">
                    <div className="db-success-circle">
                      <svg viewBox="0 0 52 52" fill="none" width="28" height="28">
                        <path d="M14 26l9 9 15-15" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="db-success-copy">
                      <div className="db-success-title">Payment Successful! 🎉</div>
                      <div className="db-success-sub">Order <strong>{newOrders[0].id}</strong> confirmed · Est. delivery: 3–5 business days</div>
                    </div>
                    <button className="db-success-cta" onClick={() => setTab('orders')}>View Order →</button>
                  </div>
                  <div className="db-success-body">
                    <div className="db-success-meta-row">
                      {[['Order ID', newOrders[0].id, ''], ['Amount Paid', newOrders[0].price, 'green'], ['Status', 'Payment Complete ✅', 'green']].map(([lbl, val, cls], i) => (
                        <div key={i} className="db-meta-col">
                          <span className="db-meta-label">{lbl}</span>
                          <span className={`db-meta-val${cls ? ' '+cls : ''}`}>{val}</span>
                        </div>
                      ))}
                    </div>
                    <div className="db-success-items-section">
                      <span className="db-meta-label" style={{marginBottom:10,display:'block'}}>Items Ordered</span>
                      {(newOrders[0].items || [{ name: newOrders[0].name, icon: '🥻', price: newOrders[0].total, qty: 1 }]).map((item, idx) => (
                        <div key={idx} className="db-success-item">
                          <div className="db-success-item-thumb" style={{ background: `linear-gradient(135deg,${item.color||'#5c1a1a'}33,${item.color||'#5c1a1a'}88)` }}>{item.icon || '🥻'}</div>
                          <div className="db-success-item-nm">{item.name}</div>
                          <div className="db-success-item-pr">₹{(item.price * (item.qty || 1)).toLocaleString('en-IN')}</div>
                        </div>
                      ))}
                    </div>
                    <div className="db-delivery-note">
                      <span>📦</span>
                      <span>Your order will be delivered within <strong>3–5 business days</strong>. You'll receive a tracking link via SMS &amp; email.</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="db-stats-row">
                {statsData.map(([ico, val, label], i) => (
                  <div key={i} className="db-stat-card">
                    <div className="db-stat-ico">{ico}</div>
                    <div className="db-stat-val">{val}</div>
                    <div className="db-stat-lbl">{label}</div>
                  </div>
                ))}
              </div>

              <div className="db-section">
                <SectionHdr label="Recent Orders" actionLabel="View All →" actionFn={() => setTab('orders')} />
                {allOrders.slice(0, 3).map((o, i) => <OrderRow key={i} o={o} onTrack={setTrackingOrder} />)}
              </div>

              <div className="db-section">
                <SectionHdr label="Saved Items" actionLabel="View All →" actionFn={() => setTab('wishlist')} />
                {wishlist.length === 0 ? (
                  <div className="db-empty" style={{padding: '20px 0'}}>No saved items.</div>
                ) : (
                  <div className="db-wish-grid">
                    {wishlist.slice(0, 3).map((w, i) => <WishCard key={i} w={w} />)}
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === 'orders' && (
            <div className="db-tab-content">
              <div className="db-page-head">
                <div>
                  <span className="db-eyebrow">Your Purchases</span>
                  <h1 className="db-page-title">My Orders</h1>
                </div>
              </div>
              {newOrders.length > 0 && (
                <div className="db-payment-notice">
                  <svg viewBox="0 0 52 52" fill="none" width="20" height="20" style={{flexShrink:0}}>
                    <circle cx="26" cy="26" r="25" stroke="#1e7a3a" strokeWidth="2"/>
                    <path d="M14 26l9 9 15-15" stroke="#1e7a3a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Payment successful for order <strong>{newOrders[0].id}</strong> · ₹{newOrders[0].price?.replace('₹','')}</span>
                </div>
              )}
              {allOrders.length === 0
                ? <div className="db-empty">No orders yet. Start shopping!</div>
                : allOrders.map((o, i) => <OrderRow key={i} o={o} onTrack={setTrackingOrder} />)
              }
            </div>
          )}

          {tab === 'wishlist' && (
            <div className="db-tab-content">
              <div className="db-page-head">
                <div>
                  <span className="db-eyebrow">Your Curation</span>
                  <h1 className="db-page-title">My Wishlist</h1>
                </div>
              </div>
              {wishlist.length === 0 ? (
                <div className="db-empty">Your wishlist is empty. Start exploring!</div>
              ) : (
                <div className="db-wish-grid large">
                  {wishlist.map((w, i) => <WishCard key={i} w={w} large />)}
                </div>
              )}
            </div>
          )}

          {tab === 'profile' && (
            <div className="db-tab-content">
              <div className="db-page-head">
                <div>
                  <span className="db-eyebrow">Account Settings</span>
                  <h1 className="db-page-title">My Profile</h1>
                </div>
              </div>
              <div className="db-profile-hero">
                <div className="db-profile-avatar">{initial}</div>
                <div>
                  <div className="db-profile-name">{user?.name}</div>
                  <div className="db-profile-handle">@{user?.username || user?.name?.toLowerCase()}</div>
                  <span className="db-profile-badge">Heritage Member</span>
                </div>
              </div>
              <div className="db-profile-grid">
                {PROFILE_FIELDS(user, calculatedPoints).map(([ico, label, val], i) => (
                  <div key={i} className="db-profile-card">
                    <span className="db-profile-ico">{ico}</span>
                    <div>
                      <div className="db-profile-label">{label}</div>
                      <div className="db-profile-val">{val}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="db-edit-btn">Edit Profile</button>
            </div>
          )}

            </>
          )}
        </main>
      </div>
    </>
  )
}