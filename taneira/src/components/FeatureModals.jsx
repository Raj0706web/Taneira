import { useState } from 'react';
import { toast } from '../data.js';

const overlayStyle = {
  position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', zIndex:900, display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(5px)'
};

const contentStyle = {
  background:'var(--ivory)', padding:'30px', borderRadius:'8px', width:'90%', maxWidth:'800px', position:'relative', maxHeight:'90vh', boxShadow:'0 20px 40px rgba(0,0,0,0.3)', overflow:'hidden', display:'flex', flexDirection:'column'
};

const closeBtnStyle = {
  position:'absolute', top:'16px', right:'16px', background:'rgba(92,26,26,.08)', border:'none', width:'34px', height:'34px', borderRadius:'50%', cursor:'pointer', color:'var(--deep-maroon)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem', zIndex:5
};

export function LookbookModal({ onClose }) {
  const images = [
    'https://images.unsplash.com/photo-1583391733958-d2597284cece',
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c',
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8',
    'https://images.unsplash.com/photo-1610116306796-6fea9f4fae38',
    'https://images.unsplash.com/photo-1550614000-4b95fcd9f660',
    'https://images.unsplash.com/photo-1589465885857-44edb59bbff2'
  ];

  return (
    <div className="modal-overlay" onClick={onClose} style={overlayStyle}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={contentStyle}>
        <button onClick={onClose} style={closeBtnStyle} onMouseEnter={e=>{e.currentTarget.style.background='var(--deep-maroon)';e.currentTarget.style.color='#fff'}} onMouseLeave={e=>{e.currentTarget.style.background='rgba(92,26,26,.08)';e.currentTarget.style.color='var(--deep-maroon)'}}>✕</button>
        <div style={{textAlign:'center', marginBottom:'24px', flexShrink:0}}>
          <h2 style={{fontFamily:'var(--fd)', color:'var(--deep-maroon)', fontSize:'2.2rem', fontWeight:400}}>Festive Lookbook</h2>
          <p style={{color:'var(--warm-gray)', fontSize:'0.9rem', marginTop:'6px'}}>Explore exquisite drapes and silhouettes from our latest collection.</p>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:'16px', overflowY:'auto', padding:'4px', flex:1}}>
          {images.map((src, i) => (
            <div key={i} style={{
              borderRadius:'6px', 
              aspectRatio: i % 3 === 0 ? '3/4' : '4/5', 
              backgroundImage:`url(${src}?auto=format&fit=crop&w=400&q=80)`, 
              backgroundSize:'cover', 
              backgroundPosition:'center',
              boxShadow:'0 4px 10px rgba(0,0,0,0.1)'
            }} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function AppointmentModal({ onClose }) {
  const [proc, setProc] = useState(false);
  
  const handleBook = (e) => {
    e.preventDefault();
    setProc(true);
    setTimeout(() => {
      setProc(false);
      toast('Appointment Confirmed! Check your email.', 's', '✅');
      onClose();
    }, 1200);
  }

  return (
    <div className="modal-overlay" onClick={onClose} style={overlayStyle}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{...contentStyle, maxWidth:'450px'}}>
        <button onClick={onClose} style={closeBtnStyle} onMouseEnter={e=>{e.currentTarget.style.background='var(--deep-maroon)';e.currentTarget.style.color='#fff'}} onMouseLeave={e=>{e.currentTarget.style.background='rgba(92,26,26,.08)';e.currentTarget.style.color='var(--deep-maroon)'}}>✕</button>
        <div style={{textAlign:'center', marginBottom:'24px'}}>
          <span style={{fontSize:'2rem', marginBottom:'10px', display:'block'}}>📅</span>
          <h2 style={{fontFamily:'var(--fd)', color:'var(--deep-maroon)', fontSize:'1.8rem', fontWeight:400}}>Book an Appointment</h2>
          <p style={{color:'var(--warm-gray)', fontSize:'0.85rem', marginTop:'8px', lineHeight:1.5}}>Schedule a personal styling and draping session at your nearest Taneira experiential store.</p>
        </div>
        <form onSubmit={handleBook} style={{display:'flex', flexDirection:'column', gap:'16px'}}>
          <input className="fi" required placeholder="Full Name *" />
          <input className="fi" type="email" required placeholder="Email Address *" />
          <input className="fi" type="tel" required placeholder="Phone Number *" />
          <div style={{display:'flex', gap:'12px'}}>
            <input className="fi" type="date" required style={{flex:1}} min={new Date().toISOString().split('T')[0]} />
            <select className="fi" required style={{flex:1}}>
              <option value="">Select Time *</option>
              <option value="11">11:00 AM</option>
              <option value="13">01:00 PM</option>
              <option value="15">03:00 PM</option>
              <option value="17">05:00 PM</option>
              <option value="18">06:00 PM</option>
            </select>
          </div>
          <button type="submit" className="ck-pb" disabled={proc} style={{marginTop:'10px', height:'48px'}}>
            {proc ? 'Confirming...' : 'Confirm Appointment'}
          </button>
        </form>
      </div>
    </div>
  )
}
