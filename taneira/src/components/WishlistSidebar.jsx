export default function WishSide({ open, wishlist, onClose, onAdd, onRem }) {
  return (
    <div className={`wls${open ? ' o' : ''}`}>
      <div className="cs-hd">
        <div>
          <h2 className="cs-ttl">Wishlist</h2>
          <span className="cs-sub">{wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}</span>
        </div>
        <button className="cs-cl" onClick={onClose}>✕</button>
      </div>

      {wishlist.length === 0 ? (
        <div className="cs-empty">
          <span className="ce-ico">♡</span>
          <h3 className="ce-ttl">Nothing saved yet</h3>
          <p className="ce-sub">Click ♡ on any product to save it here</p>
          <button className="btn-m" style={{ marginTop: 12 }} onClick={onClose}>Browse Products</button>
        </div>
      ) : (
        <div className="cs-il">
          {wishlist.map(item => (
            <div key={item.id} className="ci">
              <div className="ci-th" style={{ background: `linear-gradient(135deg,${item.color}44,${item.color}88)` }}>
                {item.image || (item.images && item.images[0]) ? (
                  <img src={item.image || item.images[0]} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  item.icon || '🥻'
                )}
              </div>
              <div className="ci-inf">
                <span className="ci-wv">{item.weave}</span>
                <p className="ci-nm">{item.name}</p>
                <p className="ci-pr">₹{item.price.toLocaleString('en-IN')}</p>
                <div style={{ display: 'flex', gap: 7, marginTop: 7 }}>
                  <button className="bb" style={{ fontSize: '.62rem', padding: '6px 14px' }} onClick={() => { onAdd(item, 1, item.sizes?.[0] || '', item.color); onClose() }}>
                    Add to Bag
                  </button>
                  <button className="bq" style={{ fontSize: '.62rem', padding: '6px 12px', color: 'var(--red)', borderColor: 'rgba(192,57,43,.3)' }} onClick={() => onRem(item)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
