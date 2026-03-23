const ITEMS = ['Handwoven Banarasi Silk','✦','Kanjivaram Sarees','✦','Chanderi Kurtas','✦','Pochampally Ikat','✦','Paithani Collection','✦','Bandhani Dupattas','✦','Zari Embroidery','✦','Jamdani Weaves','✦','Tussar Silk','✦']

export default function MarqueeBand() {
  return (
    <div className="mqb">
      <div className="mqt">
        {[...ITEMS, ...ITEMS].map((x, i) => (
          <span key={i} className={x === '✦' ? 'mqd' : 'mqi'}>{x}</span>
        ))}
      </div>
    </div>
  )
}
