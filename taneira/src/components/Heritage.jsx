import { useState } from 'react'

const STATS = [{ n: '100+', l: 'Master Weavers' }, { n: '20+', l: 'Weave Clusters' }, { n: '8', l: 'States Covered' }, { n: '2017', l: 'Est.' }]

const ARTICLES = {
  heritage: {
    title: 'Our Heritage',
    subtitle: 'Rooted in 5,000 Years of Indian Craft',
    emoji: '🏛️',
    color: '#5c1a1a',
    sections: [
      { heading: 'A Civilisation Woven in Silk', body: `India's handloom tradition is not merely craft — it is the living memory of a civilisation. For over five millennia, the loom has been the instrument through which communities expressed their identity, spirituality, and artistry. The Rig Veda references weaving. Ancient trade routes carried Indian textiles to Rome, Egypt, and China. Each weave — Banarasi, Kanjivaram, Paithani, Chanderi — carries within its warp and weft the accumulated wisdom of generations.` },
      { heading: "Taneira's Mission", body: `Founded in 2017 as a Tata Enterprise, Taneira was built on a single conviction: India's handloom traditions deserve to live on — not as museum pieces, but as living, wearable art. We work directly with over 100 master weavers across 20+ clusters — Varanasi, Kanchipuram, Paithan, Pochampally, Chanderi, Bhujodi, and more — eliminating middlemen and ensuring artisans earn a fair, dignified income. Every saree sold on Taneira funds a weaver's livelihood, a child's education, and the continuation of a tradition.` },
      { heading: 'GI Tags & Authenticity', body: `We carry only GI-tagged (Geographical Indication) products wherever certification exists. A GI tag is a legal guarantee that the product genuinely originates from its traditional region and meets quality standards. Banarasi silk from Varanasi. Kanjivaram from Kanchipuram. Paithani from Paithan. When you buy from Taneira, you receive a Certificate of Authenticity with each piece, traceable to the weaving cluster and artisan who made it.` },
      { heading: 'The Living Tradition', body: `India has 4.3 million handloom weavers — the second-largest employment sector after agriculture. Yet this community faces existential pressure from power-loom imitation and falling wages. Taneira exists to reverse this tide. By creating premium, design-forward products that celebrate authentic craft, we make handloom desirable again. Because the best way to preserve a tradition is to give it a market.` },
    ],
    stats: [{ v: '100+', l: 'Master Weavers' }, { v: '5,000+', l: 'Years of Craft' }, { v: '20+', l: 'Textile Clusters' }, { v: '₹2Cr+', l: 'Paid to Artisans' }],
    quote: '"We don\'t sell fabric. We carry forward a civilisation."',
  },
  weavers: {
    title: 'Meet Our Weavers',
    subtitle: 'The Hands Behind Every Thread',
    emoji: '🧵',
    color: '#1a3a2a',
    sections: [
      { heading: 'Ramu Bhai — Varanasi, Uttar Pradesh', body: `Ramu Bhai, 58, has woven Banarasi silk on a pitloom for 40 years. His family has practised the Kadhua technique — where each motif is individually hand-woven using a needle — for four generations in the narrow lanes of Varanasi's weaving quarter. A single Kadhua saree takes 15 to 20 days to complete. "Every thread is a prayer," he says. "The loom is my temple." Through Taneira, Ramu Bhai now earns three times what he earned selling through middlemen, and his son has chosen to continue the family tradition.` },
      { heading: 'Kamakshi — Kanchipuram, Tamil Nadu', body: `Kamakshi, 44, is one of Kanchipuram's finest Kanjivaram weavers. She spent three years mastering the korvai technique — where the body and border of the saree are woven simultaneously on separate shuttles and interlocked at the joins. Her sarees are distinguished by their zari weight: real gold and silver thread from Surat that doesn't tarnish over decades. Kamakshi trains three apprentices at her loom every year, ensuring the technique survives for generations to come.` },
      { heading: 'Rameshbhai Vankar — Bhujodi, Gujarat', body: `Rameshbhai Vankar weaves Kutchi shawls in the dhebaria rabari pattern — a geometric vocabulary developed by the Rabari pastoral community of Kutch over centuries. Each shawl takes ten days and contains more than 200,000 hand-tied knots. After the 2001 earthquake devastated Bhujodi, Rameshbhai rebuilt his loom by hand. Today his collective employs 12 weavers, all trained in traditional Kutchi patterns.` },
      { heading: 'Saraswati Devi — Pochampally, Telangana', body: `Saraswati Devi is a third-generation Ikat weaver from Pochampally. The extraordinary skill of Ikat lies in dyeing the threads before weaving so the pattern emerges as the loom is worked. Saraswati Devi designs her own patterns — no two are alike. Each piece is completely unique. "I don't make copies," she says. "I make conversations." Her work has been exhibited in the National Crafts Museum in Delhi.` },
    ],
    stats: [{ v: '100+', l: 'Master Weavers' }, { v: '4 Gen', l: 'Average Legacy' }, { v: '8', l: 'States' }, { v: '40+', l: 'Techniques' }],
    quote: '"My loom is my temple. Every saree I weave is a prayer." — Ramu Bhai, Varanasi',
  },
  sustainability: {
    title: 'Sustainability',
    subtitle: 'Craft That Cares for the Earth',
    emoji: '🌿',
    color: '#1a3a12',
    sections: [
      { heading: 'Handloom: The Original Slow Fashion', body: `A single handloom consumes zero electricity — powered entirely by human skill, time, and intention. The carbon footprint of handwoven fabric is up to 70% lower per metre compared to power-loom equivalents. There is no faster path to sustainable fashion than choosing handloom. Taneira is proud to offer a product category that is inherently sustainable — not as a marketing claim, but as a structural fact of the craft.` },
      { heading: 'Natural Dyes', body: `We work with our weaving clusters to maximise the use of natural dyes wherever feasible. Indigo from the Indigofera plant for blues. Madder root for rich reds. Pomegranate rind for warm yellows. Turmeric for golden ochre. Natural dyes are biodegradable, gentler on skin, and free from the heavy metal contamination that plagues synthetic dye run-off. We are committed to reaching 60% natural dye usage across our catalogue by 2027.` },
      { heading: 'Zero Single-Use Plastic', body: `We eliminated single-use plastic from all Taneira packaging in 2023. Every product arrives in recycled-paper boxes with cotton drawstring bags and soy-ink printed tissue. The garment bags are biodegradable. Our shipping mailers are made from recycled corrugated board. We partner with Delhivery's green logistics programme for last-mile delivery in major cities, reducing per-parcel emissions by 22%.` },
      { heading: 'Carbon Neutral by 2028', body: `We are committed to achieving carbon-neutral operations across our entire supply chain by 2028. Every Taneira purchase today funds one sapling planted in weaving communities — in partnership with the Aga Khan Rural Support Programme. To date, we have funded over 50,000 saplings across Gujarat, Telangana, and Uttar Pradesh. We publish an annual sustainability report with full supply-chain emissions disclosure.` },
    ],
    stats: [{ v: '70%', l: 'Lower Carbon' }, { v: '0', l: 'Single-Use Plastics' }, { v: '50k+', l: 'Saplings Planted' }, { v: '2028', l: 'Carbon-Neutral' }],
    quote: '"Slow fashion isn\'t a trend at Taneira — it\'s what handloom has always been."',
  },
}

function ArticleModal({ article, onClose }) {
  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,.72)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, backdropFilter: 'blur(6px)', animation: 'fadeIn .2s' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div style={{ background: 'var(--ivory)', width: '100%', maxWidth: 720, maxHeight: '90vh', overflowY: 'auto', borderRadius: 4, position: 'relative', boxShadow: '0 32px 80px rgba(0,0,0,.5)', animation: 'fadeUp .3s ease' }}>
        <button
          onClick={onClose}
          style={{ position: 'sticky', top: 0, float: 'right', margin: '16px 16px 0 0', zIndex: 10, width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,.85)', border: '1px solid rgba(0,0,0,.12)', fontSize: '.9rem', color: '#555', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >✕</button>
        <div style={{ background: article.color, padding: '40px 48px 32px', color: '#faf6f0', marginTop: -40 }}>
          <div style={{ marginTop: 40 }}>
            <div style={{ fontSize: '2.8rem', marginBottom: 12 }}>{article.emoji}</div>
            <div style={{ fontSize: '.65rem', letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(212,168,75,.7)', marginBottom: 8 }}>{article.subtitle}</div>
            <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 300, lineHeight: 1.1 }}>{article.title}</h2>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${article.stats.length},1fr)`, background: '#fff', borderBottom: '1px solid var(--border)' }}>
          {article.stats.map((s, i) => (
            <div key={i} style={{ padding: '16px 10px', textAlign: 'center', borderRight: i < article.stats.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ fontFamily: 'var(--fd)', fontSize: '1.5rem', color: 'var(--deep-maroon)' }}>{s.v}</div>
              <div style={{ fontSize: '.6rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--warm-gray)', marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '36px 48px' }}>
          <blockquote style={{ borderLeft: '3px solid var(--gold)', paddingLeft: 20, marginBottom: 32, fontFamily: 'var(--fd)', fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--deep-maroon)', lineHeight: 1.65 }}>
            {article.quote}
          </blockquote>
          {article.sections.map((sec, i) => (
            <div key={i} style={{ marginBottom: 28 }}>
              <h3 style={{ fontFamily: 'var(--fd)', fontSize: '1.2rem', fontWeight: 400, color: 'var(--deep-maroon)', marginBottom: 10, paddingBottom: 8, borderBottom: '1px solid rgba(184,135,42,.18)' }}>{sec.heading}</h3>
              <p style={{ fontSize: '.88rem', lineHeight: 1.9, color: 'var(--warm-gray)' }}>{sec.body}</p>
            </div>
          ))}
          <button onClick={onClose} style={{ marginTop: 8, padding: '12px 32px', background: 'var(--deep-maroon)', color: 'var(--gold-light)', border: 'none', borderRadius: 2, fontSize: '.74rem', letterSpacing: '.16em', textTransform: 'uppercase', cursor: 'pointer' }}>
            Close Article
          </button>
        </div>
      </div>
    </div>
  )
}

export default function HerSec() {
  const [activeArticle, setActiveArticle] = useState(null)
  return (
    <>
      {activeArticle && <ArticleModal article={ARTICLES[activeArticle]} onClose={() => setActiveArticle(null)} />}
      <section className="her">
        <div className="her-gr">
          <div className="mot-wr">
            <div className="mot-c">
              {[...Array(12)].map((_, i) => <div key={i} className="mot-p" style={{ transform: `rotate(${i * 30}deg) translateY(-60px)` }} />)}
              <div className="mot-ch">त</div>
            </div>
          </div>
          <div className="her-txt">
            <span className="sec-pre" style={{ color: 'var(--gold)' }}>Our Story</span>
            <h2 className="her-ttl">Where Tradition<br /><em>Meets Craftsmanship</em></h2>
            <p className="her-bd">Taneira, a Tata Enterprise, is a celebration of India's extraordinary handloom heritage. We work directly with master weavers across more than 20 textile clusters.</p>
            <p className="her-bd">Each piece is a conversation between centuries-old technique and contemporary sensibility.</p>
            <div className="her-sts">
              {STATS.map((s, i) => (
                <div key={i} className="hs">
                  <span className="hs-n">{s.n}</span>
                  <span className="hs-l">{s.l}</span>
                </div>
              ))}
            </div>
            <div className="her-acts">
              <button className="btn-g" onClick={() => setActiveArticle('heritage')}>Our Heritage</button>
              <button className="btn-ol" onClick={() => setActiveArticle('weavers')}>Meet Weavers</button>
              <button className="btn-ol" onClick={() => setActiveArticle('sustainability')}>Sustainability</button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
