import { useState, useEffect } from "react";
import { toast, NAV_LINKS } from "../data.js";

export default function Navbar({
  cartCnt,
  wishCnt,
  onCart,
  onWish,
  onSearch,
  onMenu,
  currentUser,
  onLogin,
  onSignup,
  onLogout,
  onDashboard,
  onNav,
}) {
  const [sc, setSc] = useState(false);
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 52);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={sc ? "sc" : ""}>
      <div className="nav-inner">
        <button className="hb" onClick={onMenu}>
          <span />
          <span />
          <span />
        </button>
        <a href="#" className="logo">
          <span className="logo-tata">TATA</span>
          <span className="logo-sep">|</span>
          <div>
            <span className="logo-t">Taneira</span>
            <span className="logo-s">Handloom Heritage</span>
          </div>
        </a>
        <ul className="nav-links">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <span
                className="nl"
                onClick={() => onNav?.(l)}
              >
                {l}
              </span>
            </li>
          ))}
        </ul>
        <div className="nav-acts">
          <button className="ib" onClick={onSearch} title="Search">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
          <button className="ib" onClick={onWish} title="Wishlist">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {wishCnt > 0 && <span className="cbadge">{wishCnt}</span>}
          </button>
          <button className="ib" onClick={onCart} title="Cart">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCnt > 0 && <span className="cbadge">{cartCnt}</span>}
          </button>
          {currentUser ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                className="nb nb-o"
                style={{ display: "flex", alignItems: "center", gap: 6 }}
                onClick={onDashboard}
              >
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#b8872a,#d4a84b)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: ".7rem",
                    color: "#5c1a1a",
                    fontWeight: 600,
                  }}
                >
                  {currentUser?.name?.[0]?.toUpperCase() || "U"}
                </span>

                {currentUser?.name || "User"}
              </button>

              <button className="nb nb-f" onClick={onLogout}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <button className="nb nb-o" onClick={onLogin}>
                Login
              </button>
              <button className="nb nb-f" onClick={onSignup}>
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
