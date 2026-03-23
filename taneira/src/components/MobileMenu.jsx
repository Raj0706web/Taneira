import { toast } from '../data.js'

const LINKS = ['Sarees','Kurtas','Lehengas','Festive','Wedding','Sale','About Us','Find a Store']

export default function MobileMenu({ onClose, onLogin, onSignup }) {
  return (
    <div className="mm">
      <button className="mm-cl" onClick={onClose}>✕</button>
      {LINKS.map(l => (
        <span key={l} className="mm-link" onClick={() => { onClose(); toast(`Browsing ${l}...`, 'i', '✦') }}>{l}</span>
      ))}
      <div className="mm-acts">
        <button className="nb nb-o" style={{ flex: 1 }} onClick={() => { onClose(); onLogin?.() }}>Login</button>
        <button className="nb nb-f" style={{ flex: 1 }} onClick={() => { onClose(); onSignup?.() }}>Sign Up</button>
      </div>
    </div>
  )
}
