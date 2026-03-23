import { useState, useRef, useEffect } from 'react'

const AGENT = {
  name: 'Gini',
  role: 'Taneira Saree Expert',
  avatar: 'G',
  online: true,
}

const BOT_REPLIES = [
  "Namaste! I'd be happy to help you find the perfect saree. Are you looking for silk, cotton, or a special occasion weave?",
  "We have exquisite Banarasi, Kanjivaram, and Chanderi collections in stock. Which region's weaves interest you?",
  "Our current festive collection features stunning Zari work. Would you like me to share some handpicked recommendations?",
  "For wedding occasions, I'd suggest our Kanjivaram pure silk range. Shall I guide you through it?",
  "Thank you for your patience! One of our weave specialists will follow up with you shortly on WhatsApp.",
]

const QUICK_REPLIES = [
  'Browse Silk Sarees',
  'Wedding Collection',
  'Track My Order',
  'Store Locator',
]

let botIndex = 0

export default function LiveChat() {
  const [open, setOpen] = useState(false)
  const [chatStarted, setChatStarted] = useState(false)
  const [msg, setMsg] = useState('')
  const [messages, setMessages] = useState([
    { from: 'agent', text: 'Namaste! Welcome to Taneira. How may I assist you today?', time: '' }
  ])
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const now = () =>
    new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })

  const sendMsg = (text) => {
    const content = text ?? msg
    if (!content.trim()) return
    setMessages(prev => [...prev, { from: 'user', text: content, time: now() }])
    setMsg('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [
        ...prev,
        {
          from: 'agent',
          text: BOT_REPLIES[botIndex % BOT_REPLIES.length],
          time: now(),
        },
      ])
      botIndex++
    }, 1400)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --maroon: #5c1a1a;
          --maroon-dark: #3d0f0f;
          --maroon-light: #7a2525;
          --gold: #c9943a;
          --gold-light: #e8c170;
          --cream: #fdf6ee;
          --petal: #f9e8d8;
          --fb: 'DM Sans', sans-serif;
          --fd: 'Cormorant Garamond', serif;
        }

        .tc-btn {
          position: fixed; bottom: 28px; right: 28px; z-index: 9000;
          width: 62px; height: 62px; border-radius: 50%;
          background: linear-gradient(135deg, var(--maroon), var(--maroon-dark));
          border: 2.5px solid var(--gold);
          color: var(--gold-light); font-size: 1.5rem;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; box-shadow: 0 6px 28px rgba(92,26,26,.5);
          transition: transform .2s, box-shadow .2s;
          font-family: var(--fb);
        }
        .tc-btn:hover { transform: scale(1.08); box-shadow: 0 10px 36px rgba(92,26,26,.65); }

        .tc-panel {
          position: fixed; bottom: 106px; right: 28px; z-index: 9000;
          width: 360px; max-width: 94vw;
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 12px 60px rgba(0,0,0,.22), 0 0 0 1px rgba(201,148,58,.15);
          display: flex; flex-direction: column; overflow: hidden;
          animation: popUp .28s cubic-bezier(.34,1.56,.64,1);
          font-family: var(--fb);
          max-height: 88vh;
        }

        @keyframes popUp {
          from { opacity: 0; transform: translateY(24px) scale(.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .tc-header {
          background: linear-gradient(135deg, var(--maroon-dark) 0%, var(--maroon) 60%, var(--maroon-light) 100%);
          padding: 22px 20px 18px;
          position: relative;
          overflow: hidden;
        }
        .tc-header::before {
          content: '';
          position: absolute; inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9943a' fill-opacity='0.07'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity: 1;
        }
        .tc-logo {
          font-family: var(--fd);
          color: var(--gold-light);
          font-size: 1.1rem;
          font-weight: 600;
          letter-spacing: .12em;
          text-transform: uppercase;
          opacity: .85;
          margin-bottom: 10px;
          position: relative;
        }
        .tc-welcome {
          font-family: var(--fd);
          font-size: 1.7rem;
          font-weight: 700;
          color: #fff;
          line-height: 1.15;
          position: relative;
        }
        .tc-sub {
          font-size: .78rem;
          color: rgba(255,255,255,.65);
          margin-top: 4px;
          position: relative;
          font-weight: 300;
        }
        .tc-agent-row {
          display: flex; align-items: center; gap: 11px;
          position: relative;
        }
        .tc-avatar {
          width: 44px; height: 44px; border-radius: 50%;
          background: linear-gradient(135deg, var(--gold), var(--gold-light));
          display: flex; align-items: center; justify-content: center;
          font-family: var(--fd); font-weight: 700; font-size: 1.1rem;
          color: var(--maroon-dark); flex-shrink: 0;
          border: 2px solid rgba(255,255,255,.3);
        }
        .tc-online-dot {
          width: 11px; height: 11px; border-radius: 50%;
          background: #4caf50; border: 2px solid #fff;
          position: absolute; top: 0; left: 0;
        }
        .tc-agent-name { font-weight: 600; color: #fff; font-size: .9rem; }
        .tc-agent-role { font-size: .72rem; color: rgba(255,255,255,.7); font-weight: 300; }

        .tc-prewrap {
          padding: 16px 16px 0;
          background: var(--cream);
        }
        .tc-card {
          background: #fff;
          border-radius: 14px;
          padding: 16px;
          box-shadow: 0 2px 16px rgba(92,26,26,.1);
          border: 1px solid rgba(201,148,58,.15);
        }
        .tc-card-agent { display: flex; align-items: center; gap: 12px; }
        .tc-card-avatar {
          width: 48px; height: 48px; border-radius: 50%;
          background: linear-gradient(135deg, var(--gold), var(--gold-light));
          display: flex; align-items: center; justify-content: center;
          font-family: var(--fd); font-weight: 700; font-size: 1.1rem;
          color: var(--maroon-dark); flex-shrink: 0;
          border: 2px solid rgba(201,148,58,.3);
          position: relative;
        }
        .tc-start-btn {
          width: 100%; margin-top: 14px;
          background: linear-gradient(135deg, var(--maroon-dark), var(--maroon));
          color: var(--gold-light); border: none; border-radius: 10px;
          padding: 13px; font-size: .85rem; font-weight: 600;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
          font-family: var(--fb); letter-spacing: .04em;
          transition: opacity .2s, transform .15s;
          border: 1px solid rgba(201,148,58,.3);
        }
        .tc-start-btn:hover { opacity: .9; transform: translateY(-1px); }

        .tc-quick {
          display: flex; flex-wrap: wrap; gap: 7px;
          padding: 12px 16px 0;
          background: var(--cream);
        }
        .tc-chip {
          background: var(--petal); border: 1px solid rgba(201,148,58,.35);
          color: var(--maroon); border-radius: 20px;
          padding: 6px 13px; font-size: .75rem; font-weight: 500;
          cursor: pointer; font-family: var(--fb);
          transition: background .2s, color .2s;
          white-space: nowrap;
        }
        .tc-chip:hover { background: var(--maroon); color: var(--gold-light); }

        .tc-messages {
          flex: 1; overflow-y: auto; padding: 14px 14px 8px;
          display: flex; flex-direction: column; gap: 10px;
          min-height: 200px; max-height: 300px;
          background: var(--cream);
          scroll-behavior: smooth;
        }
        .tc-messages::-webkit-scrollbar { width: 4px; }
        .tc-messages::-webkit-scrollbar-thumb { background: rgba(92,26,26,.2); border-radius: 4px; }

        .tc-bubble-wrap { display: flex; gap: 8px; }
        .tc-bubble-wrap.user { justify-content: flex-end; }

        .tc-bubble {
          max-width: 74%; padding: 9px 13px;
          font-size: .82rem; line-height: 1.55;
          border-radius: 14px; word-break: break-word;
        }
        .tc-bubble.agent {
          background: #fff;
          color: #333;
          border-radius: 14px 14px 14px 4px;
          box-shadow: 0 2px 8px rgba(0,0,0,.07);
          border: 1px solid rgba(0,0,0,.06);
        }
        .tc-bubble.user {
          background: linear-gradient(135deg, var(--maroon), var(--maroon-light));
          color: #fff;
          border-radius: 14px 14px 4px 14px;
        }
        .tc-time {
          font-size: .62rem; color: #bbb;
          text-align: right; margin-top: 3px;
        }

        .tc-typing {
          display: flex; align-items: center; gap: 4px;
          padding: 10px 13px; background: #fff;
          border-radius: 14px; width: fit-content;
          box-shadow: 0 2px 8px rgba(0,0,0,.07);
          border: 1px solid rgba(0,0,0,.06);
        }
        .tc-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--gold);
          animation: bounce 1.1s infinite ease-in-out;
        }
        .tc-dot:nth-child(2) { animation-delay: .18s; }
        .tc-dot:nth-child(3) { animation-delay: .36s; }
        @keyframes bounce {
          0%,80%,100% { transform: translateY(0); opacity: .4; }
          40% { transform: translateY(-5px); opacity: 1; }
        }

        .tc-input-row {
          padding: 10px 14px; border-top: 1px solid rgba(201,148,58,.15);
          display: flex; gap: 8px; align-items: center;
          background: #fff;
        }
        .tc-input {
          flex: 1; border: 1.5px solid #e8d5c0; border-radius: 22px;
          padding: 9px 15px; font-size: .82rem; outline: none;
          font-family: var(--fb); color: #333; background: var(--cream);
          transition: border-color .2s;
        }
        .tc-input:focus { border-color: var(--gold); }
        .tc-send {
          width: 38px; height: 38px; border-radius: 50%;
          background: linear-gradient(135deg, var(--maroon-dark), var(--maroon));
          border: none; color: var(--gold-light);
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: transform .15s;
        }
        .tc-send:hover { transform: scale(1.08); }

        .tc-footer {
          padding: 7px 14px; text-align: center;
          font-size: .62rem; color: #bbb; background: #fff;
          border-top: 1px solid rgba(0,0,0,.05);
          font-family: var(--fb);
        }
        .tc-footer span { color: var(--maroon); font-weight: 600; }
      `}</style>

      {/* Floating button */}
      <button className="tc-btn" onClick={() => setOpen(o => !o)} title="Chat with Taneira">
        {open ? '✕' : '🪡'}
      </button>

      {open && (
        <div className="tc-panel">
          {/* Header */}
          <div className="tc-header">
            {!chatStarted ? (
              <>
                <div className="tc-logo">✦ Taneira</div>
                <div className="tc-welcome">Namaste!<br />We're here to help.</div>
                <div className="tc-sub">India's finest handloom sarees — crafted with love.</div>
              </>
            ) : (
              <div className="tc-agent-row">
                <div style={{ position: 'relative' }}>
                  <div className="tc-avatar">{AGENT.avatar}</div>
                  <div className="tc-online-dot" />
                </div>
                <div>
                  <div className="tc-agent-name">{AGENT.name}</div>
                  <div className="tc-agent-role">{AGENT.role}</div>
                </div>
                <div style={{ marginLeft: 'auto', fontSize: '.7rem', color: 'rgba(255,255,255,.55)', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 7, height: 7, background: '#4caf50', borderRadius: '50%', display: 'inline-block' }} />
                  Online
                </div>
              </div>
            )}
          </div>

          {/* Pre-chat card */}
          {!chatStarted && (
            <div className="tc-prewrap">
              <div className="tc-card">
                <div className="tc-card-agent">
                  <div className="tc-card-avatar">
                    {AGENT.avatar}
                    <div style={{ position: 'absolute', top: 1, left: 1, width: 12, height: 12, borderRadius: '50%', background: '#4caf50', border: '2px solid #fff' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: '#222', fontSize: '.88rem' }}>{AGENT.name}</div>
                    <div style={{ fontSize: '.75rem', color: '#888' }}>Namaste! How may I help you?</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 3 }}>
                      <span style={{ width: 7, height: 7, background: '#4caf50', borderRadius: '50%', display: 'inline-block' }} />
                      <span style={{ fontSize: '.68rem', color: '#888' }}>Typically replies in minutes</span>
                    </div>
                  </div>
                </div>
                <button className="tc-start-btn" onClick={() => setChatStarted(true)}>
                  Start Chat
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15">
                    <path d="m22 2-11 20-4-9-9-4 24-7z" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Quick replies */}
          {!chatStarted && (
            <div className="tc-quick">
              {QUICK_REPLIES.map(q => (
                <button key={q} className="tc-chip" onClick={() => { setChatStarted(true); setTimeout(() => sendMsg(q), 100) }}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Messages */}
          {chatStarted && (
            <div className="tc-messages">
              {messages.map((m, i) => (
                <div key={i} className={`tc-bubble-wrap ${m.from}`}>
                  {m.from === 'agent' && (
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,var(--gold),var(--gold-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.72rem', color: 'var(--maroon-dark)', fontWeight: 700, flexShrink: 0, alignSelf: 'flex-end', fontFamily: 'var(--fd)' }}>{AGENT.avatar}</div>
                  )}
                  <div>
                    <div className={`tc-bubble ${m.from}`}>{m.text}</div>
                    {m.time && <div className="tc-time">{m.time}</div>}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="tc-bubble-wrap">
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,var(--gold),var(--gold-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.72rem', color: 'var(--maroon-dark)', fontWeight: 700, flexShrink: 0, fontFamily: 'var(--fd)' }}>{AGENT.avatar}</div>
                  <div className="tc-typing">
                    <div className="tc-dot" /><div className="tc-dot" /><div className="tc-dot" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}

          {/* Input */}
          {chatStarted && (
            <div className="tc-input-row">
              <input
                className="tc-input"
                value={msg}
                onChange={e => setMsg(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMsg()}
                placeholder="Ask about sarees, orders, stores…"
              />
              <button className="tc-send" onClick={() => sendMsg()}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                  <path d="m22 2-11 20-4-9-9-4 24-7z" />
                </svg>
              </button>
            </div>
          )}

          <div className="tc-footer">Powered by <span>Taneira LiveChat</span> · India's Handloom Heritage</div>
        </div>
      )}
    </>
  )
}