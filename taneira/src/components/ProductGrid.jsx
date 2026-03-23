import { useState, useEffect } from "react";
import { TAGCOL, TAGTXT, FILTERS, SORTOPS, toast } from "../data.js";

function ProdCard({
  prod: p,
  isLV,
  delay,
  addToCart,
  toggleWish,
  isWished,
  onQV,
  onNav,
}) {
  const price = p.price || 0;
  const mrp = p.originalPrice || price * 1.2;
  const rating = p.rating || 4;
  const rev = p.numReviews || 0;
  const rawTag = p.tags?.[0] || p.tag || "";
  const tag = rawTag ? rawTag.charAt(0).toUpperCase() + rawTag.slice(1) : "";
  const color = p.colors?.[0] || "#8B1A1A";
  const image = p.image || (p.images && p.images[0]);
  return (
    <div
      className={`pc${isLV ? " lvc" : ""}`}
      style={{ animationDelay: `${delay}s`, cursor: "pointer" }}
      onClick={onQV}
    >
      <div className="piw">
        <div
          className="pmk"
          style={{
            background: `linear-gradient(160deg,${p.color}2a,${p.color}88)`,
          }}
        >
          <img src={image} alt={p.name} className="prod-img" />
          <div className="pmk-fab">
            {[...Array(7)].map((_, j) => (
              <div
                key={j}
                className="pmk-fl"
                style={{
                  background: "rgba(212,168,75,.7)",
                  animationDelay: `${j * 0.1}s`,
                }}
              />
            ))}
          </div>
          <span className="pmk-wv">{p.weave}</span>
        </div>
        <div className="pov">
          <button
            className="bq"
            onClick={(e) => {
              e.stopPropagation();
              onQV();
            }}
          >
            Quick View
          </button>
          <button
            className="bb"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(p, 1, p.sizes?.[0] || "", p.colors?.[0] || "");
            }}
          >
            Add to Bag
          </button>
        </div>
        {tag && (
          <span
            className="ptag"
            style={{
              background: TAGCOL[tag] || "#5c1a1a",
              color: TAGTXT[tag] || "var(--gold-light)",
            }}
            onClick={(e) => {
              e.stopPropagation();
              onNav?.(tag);
            }}
          >
            {tag}
          </span>
        )}
        <button
          className={`wb${isWished ? " wd" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWish(p);
          }}
        >
          {isWished ? "♥" : "♡"}
        </button>
      </div>
      <div className="pinf">
        <span className="pwt">{p.weave}</span>
        <h3 className="pn">{p.name}</h3>
        <div className="prat">
          <span className="pst">
            {"★".repeat(Math.floor(rating))}
            {rating % 1 ? "½" : ""}
          </span>
          <span>
            {rating} ({rev})
          </span>
        </div>
        <div className="ppr">
          <span className="pp">₹{price.toLocaleString("en-IN")}</span>
          <span className="pm">₹{mrp.toLocaleString("en-IN")}</span>
          <span className="po">{Math.round((1 - price / mrp) * 100)}% off</span>
        </div>
        <div className="pclr">
          {(p.colors || ["#8B1A1A", "#1a2a4a"]).map((c, ci) => (
            <span key={ci} className="cd" style={{ background: c }} />
          ))}
          <span className="cm">
            +{Math.max(0, 4 - (p.colors || []).length + 2)} more
          </span>
        </div>
      </div>
    </div>
  );
}

export function ProdModal({
  prod: p,
  onClose,
  addToCart,
  toggleWish,
  wishlist,
}) {
  const [selSz, setSelSz] = useState("");
  const [selCl, setSelCl] = useState(p.color);
  const [qty, setQty] = useState(1);
  const [currIdx, setCurrIdx] = useState(0);
  const [pin, setPin] = useState("");
  const [del, setDel] = useState("");
  const [tab, setTab] = useState("desc");
  const isWished = !!wishlist.find((w) => w._id === p._id);
  const rating = p.rating || 4;
  const rev = p.numReviews || 0;
  const mrp = p.originalPrice || (p.price || 0) * 1.2;

  const handleAdd = () => {
    if (!selSz) {
      toast("Please select a size", "e", "⚠️");
      return;
    }
    addToCart(p, qty, selSz, selCl);
    onClose();
  };
  const checkPin = () => {
    if (pin.length === 6) {
      const dt = new Date(
        Date.now() + [3, 4, 5][Math.floor(Math.random() * 3)] * 86400000,
      );
      setDel(
        `✓ Estimated delivery by ${dt.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}`,
      );
    } else toast("Enter a valid 6-digit pincode", "e", "⚠️");
  };

  const rawTag = p.tags?.[0] || p.tag || "";
  const tag = rawTag ? rawTag.charAt(0).toUpperCase() + rawTag.slice(1) : "";

  return (
    <div
      className="mov"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="mb">
        <button className="mc" onClick={onClose}>
          ✕
        </button>
        <div
          className="mi"
          style={{
            background: `linear-gradient(160deg,${p.color}28,${p.color}88)`,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {p.image || (p.images && p.images[0]) ? (
            <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src={p.images?.[currIdx] || p.image || p.images?.[0]}
                alt={p.name}
                className="prod-img"
                style={{ objectFit: "contain", padding: "20px", transition: "all 0.3s ease" }}
              />
              
              {p.images?.length > 1 && (
                <div className="m-thms" style={{ 
                  position: "absolute", 
                  bottom: "15px", 
                  display: "flex", 
                  gap: "8px",
                  zIndex: 2 
                }}>
                  {p.images.slice(0, 3).map((img, idx) => (
                    <img 
                      key={idx}
                      src={img}
                      className={`m-thm${currIdx === idx ? " sel" : ""}`}
                      onClick={() => setCurrIdx(idx)}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "4px",
                        border: currIdx === idx ? "2px solid var(--gold)" : "2px solid transparent",
                        cursor: "pointer",
                        background: "#fff"
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="mim">
              <span className="mim-ico">{p.icon}</span>
              <span className="mim-sub">{p.weave} Weave</span>
            </div>
          )}
          <div
            className="pmk-fab"
            style={{ position: "absolute", inset: 0, opacity: 0.08, pointerEvents: "none" }}
          >
            {[...Array(8)].map((_, j) => (
              <div
                key={j}
                className="pmk-fl"
                style={{ background: "rgba(212,168,75,.8)" }}
              />
            ))}
          </div>
        </div>
        <div className="minf">
          {tag && (
            <span
              className="m-badge"
              style={{
                background: TAGCOL[tag] || "#5c1a1a",
                color: TAGTXT[tag] || "var(--gold-light)",
              }}
            >
              {tag}
            </span>
          )}
          <span className="m-wv">{p.weave}</span>
          <h2 className="m-name">{p.name}</h2>
          <div className="m-rat">
            <span className="m-rats">
              {"★".repeat(Math.floor(rating))}
              {rating % 1 ? "½" : ""}
            </span>
            <span>
              {rating} · {rev} reviews
            </span>
            <button
              className="shr-btn"
              onClick={() => toast("Loading all reviews...", "i", "⭐")}
            >
              See all
            </button>
          </div>
          <div className="m-pr">
            <span className="m-price">
              ₹{(p.price * qty).toLocaleString("en-IN")}
            </span>
            <span className="m-mrp">₹{mrp.toLocaleString("en-IN")}</span>
            <span className="m-off">
              {Math.round((1 - p.price / mrp) * 100)}% off
            </span>
          </div>
          <div className="m-div" />
          <div>
            <span className="m-lbl">Colour</span>
            <div className="m-clrs">
              {p.colors.map((c, i) => (
                <button
                  key={i}
                  className={`m-cl${selCl === c ? " sel" : ""}`}
                  style={{ background: c }}
                  onClick={() => setSelCl(c)}
                />
              ))}
            </div>
          </div>
          <div>
            <span className="m-lbl">Size {selSz && `— ${selSz}`}</span>
            <div className="m-szs">
              {p.sizes.map((s, i) => {
                const oos = i === p.sizes.length - 1 && p.sizes.length > 4;
                return (
                  <button
                    key={i}
                    className={`m-sz${selSz === s ? " sel" : ""}${oos ? " oos" : ""}`}
                    onClick={() =>
                      oos ? toast("Out of stock", "e", "⚠️") : setSelSz(s)
                    }
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
          <div style={{ display: "flex", gap: 7, marginBottom: 4 }}>
            {["desc", "features", "care"].map((t) => (
              <button
                key={t}
                className="shr-btn"
                style={
                  tab === t
                    ? { borderColor: "var(--gold)", color: "var(--gold)" }
                    : {}
                }
                onClick={() => setTab(t)}
              >
                {t === "desc"
                  ? "Description"
                  : t === "features"
                    ? "Features"
                    : "Care"}
              </button>
            ))}
          </div>
          {tab === "desc" && <p className="m-desc">{p.desc}</p>}
          {tab === "features" && (
            <div className="m-feat">
              {p.features.map((f, i) => (
                <div key={i} className="m-feat-item">
                  <span className="m-feat-ico">✦</span>
                  {f}
                </div>
              ))}
            </div>
          )}
          {tab === "care" && (
            <p className="m-desc">
              Dry clean recommended for silk. Store in muslin cloth. Avoid
              direct sunlight.
            </p>
          )}
          <div className="m-div" />
          <div>
            <span className="m-lbl">Check Delivery</span>
            <div className="pin-row">
              <input
                className="pin-in"
                placeholder="Enter 6-digit pincode"
                value={pin}
                maxLength={6}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                onKeyDown={(e) => e.key === "Enter" && checkPin()}
              />
              <button className="pin-btn" onClick={checkPin}>
                Check
              </button>
            </div>
            {del && (
              <div className="del-info">
                <span>✓</span>
                <span>{del}</span>
              </div>
            )}
          </div>
          <div className="m-acts">
            <div className="m-qr">
              <span
                className="m-lbl"
                style={{ marginBottom: 0, whiteSpace: "nowrap" }}
              >
                Qty:
              </span>
              <div className="qc">
                <button
                  className="qm"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  −
                </button>
                <input className="qv" value={qty} readOnly />
                <button className="qp" onClick={() => setQty((q) => q + 1)}>
                  +
                </button>
              </div>
              <button
                className={`m-wb${isWished ? " wd" : ""}`}
                onClick={() => toggleWish(p)}
              >
                {isWished ? "♥ Saved" : "♡ Save"}
              </button>
            </div>
            <button className="m-ab" onClick={handleAdd}>
              Add to Bag — ₹{(p.price * qty).toLocaleString("en-IN")}
            </button>
            <button
              className="btn-om"
              style={{ width: "100%", textAlign: "center" }}
              onClick={() => {
                toast("Opening buy now...", "i", "⚡");
                handleAdd();
              }}
            >
              Buy Now
            </button>
          </div>
          <div className="m-div" />
          <div className="m-shr">
            <span className="shr-lbl">Share:</span>
            {["WhatsApp", "Instagram", "Copy Link", "Pinterest"].map((s) => (
              <button
                key={s}
                className="shr-btn"
                onClick={() => toast(`Sharing on ${s}...`, "i", "✦")}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProdsSec({
  products = [],
  addToCart,
  toggleWish,
  wishlist,
  onQV,
  navFilt,
  onNav,
}) {
  const [filt, setFilt] = useState("All");
  const [sort, setSort] = useState("Recommended");
  const [view, setView] = useState("g4");
  const [visibleCount, setVisibleCount] = useState(8);

  // Sync internal filter with Navbar/External navigation
  useEffect(() => {
    if (navFilt) {
      setFilt(navFilt);
      setVisibleCount(8);
    }
  }, [navFilt]);

  const safeProducts = Array.isArray(products)
    ? products
    : products?.products || [];
  console.log("SAFE PRODUCTS:", safeProducts);
  const filtered =
    filt === "All"
      ? safeProducts
      : safeProducts.filter((p) => {
          const cat = (p.category || p.cat || "").toLowerCase();
          const f = filt.toLowerCase();
          const singularF = f.endsWith("s") ? f.slice(0, -1) : f;

          const catMatch =
            cat &&
            (cat.includes(f) || cat.includes(singularF) || f.includes(cat));
          const tagMatch = (p.tags || [p.tag]).filter(Boolean).some((t) => {
            const tag = t.toLowerCase();
            return tag === f || tag === singularF;
          });
          return catMatch || tagMatch;
        });
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "Price: Low to High") return (a.price || 0) - (b.price || 0);
    if (sort === "Price: High to Low") return (b.price || 0) - (a.price || 0);
    if (sort === "Top Rated") return (b.rating || 0) - (a.rating || 0);
    if (sort === "Most Popular") return (b.rev || 0) - (a.rev || 0);
    return 0;
  });

  const visibleProducts = sorted.slice(0, visibleCount);

  return (
    <section className="prods">
      <div className="prod-hd">
        <div>
          <span className="sec-pre">Handpicked for You</span>
          <h2 className="sec-ttl">Featured Products</h2>
        </div>
        <div className="ftb">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`fc${filt === f ? " a" : ""}`}
              onClick={() => {
                setFilt(f);
                setVisibleCount(8);
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="tb">
        <span className="rc">
          {sorted.length} product{sorted.length !== 1 ? "s" : ""} found
        </span>
        <div className="tb-r">
          <select
            className="ss-sel"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            {SORTOPS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          <div className="vt">
            {[
              ["g4", "▦ 4"],
              ["g3", "▦ 3"],
              ["lv", "☰"],
            ].map(([v, lbl]) => (
              <button
                key={v}
                className={`vb${view === v ? " a" : ""}`}
                onClick={() => setView(v)}
              >
                {lbl}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className={`pg ${view}`}>
        {visibleProducts.map((p, i) => (
          <ProdCard
            key={p._id || p.id}
            prod={p}
            isLV={view === "lv"}
            delay={i * 0.055}
            addToCart={addToCart}
            toggleWish={toggleWish}
            isWished={!!wishlist.find((w) => (w._id || w.id) === (p._id || p.id))}
            onQV={() => onQV(p)}
            onNav={onNav}
          />
        ))}
      </div>
      <div className="prod-cta">
        {visibleCount < sorted.length && (
          <button
            className="btn-m"
            onClick={() => setVisibleCount((prev) => prev + 4)}
          >
            Load More Products
          </button>
        )}
        <button
          className="btn-om"
          onClick={() => {
            setFilt("All");
            setVisibleCount(safeProducts.length);
          }}
        >
          Full Catalogue
        </button>
        <button
          className="btn-om"
          style={{ borderColor: "var(--gold)", color: "var(--gold)" }}
          onClick={() => {
            setFilt("Sale");
            setVisibleCount(8);
          }}
        >
          View Sale Items
        </button>
      </div>
    </section>
  );
}
