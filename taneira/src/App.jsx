import { useState, useEffect } from "react";
import { PRODS, toast } from "./data.js";

import Navbar from "./components/Navbar.jsx";
import MobileMenu from "./components/MobileMenu.jsx";
import Footer from "./components/Footer.jsx";
import LiveChat from "./components/LiveChat.jsx";

import SearchOverlay from "./components/SearchOverlay.jsx";
import CartSidebar from "./components/CartSidebar.jsx";
import WishlistSidebar from "./components/WishlistSidebar.jsx";
import CheckoutModal from "./components/CheckoutModal.jsx";
import { ProdModal } from "./components/ProductGrid.jsx";

import LoginPage from "./components/Login.jsx";
import SignupPage from "./components/Signup.jsx";
import DashboardPage from "./components/Dashboard.jsx";

import HeroSec from "./components/Hero.jsx";
import MarqueeBand from "./components/MarqueeBand.jsx";
import CatsSec from "./components/Categories.jsx";
import ProdsSec from "./components/ProductGrid.jsx";
import HerSec from "./components/Heritage.jsx";
import CustSec from "./components/Customize.jsx";
import TstSec from "./components/Testimonials.jsx";
import NlSec from "./components/Newsletter.jsx";
import {
  LookbookModal,
  AppointmentModal,
} from "./components/FeatureModals.jsx";
import { getCart, addCartItem, removeCartItem, applyCoupon } from "./api/Cart";
import { getProducts } from "./api/product";
import {
  getWishlist,
  toggleWishlist as toggleApiWishlist,
} from "./api/wishlist";

export default function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWish] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishOpen, setWishOpen] = useState(false);
  const [searchOpen, setSearch] = useState(false);
  const [menuOpen, setMenu] = useState(false);
  const [qv, setQv] = useState(null);
  const [checkout, setCO] = useState(false);
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(null); // 'lookbook' | 'appointment' | null

  // view: null | 'login' | 'signup' | 'dashboard'
  const [view, setView] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [placedOrders, setPlacedOrders] = useState([]);
  const [navFilt, setNavFilt] = useState("All");

  useEffect(() => {
    try {
      const user = localStorage.getItem("user");

      if (user && user !== "undefined") {
        setCurrentUser(JSON.parse(user));
      }
    } catch (err) {
      console.log("Invalid user in localStorage");
      localStorage.removeItem("user");
    }
  }, []);

  useEffect(() => {
    const fetchCartAndWish = async () => {
      try {
        if (!currentUser) return;

        const res = await getCart();
        setCart(res.data.items || []);

        const wRes = await getWishlist();
        setWish(wRes.data?.products || []);
      } catch (err) {
        console.log("Cart/Wishlist fetch error", err);
      }
    };

    fetchCartAndWish();
  }, [currentUser]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);
      } catch (err) {
        console.log("Product fetch error", err);
      }
    };

    fetchProducts();
  }, []);
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast("Logged out successfully", "i", "✦");
  };
  const addToCart = async (prod, qty = 1, size = "", col = "") => {
    try {
      const res = await addCartItem({
        productId: prod._id || prod.id,
        quantity: qty,
        size,
        color: col || prod.color,
      });

      setCart(res.data.items || []); // backend returns updated cart object
      toast(`Added to bag — ${prod.name}`, "s", "🛍️");
    } catch (err) {
      console.log(err);
      if (err.response?.status === 401) {
        toast("Login required", "e");
        setView("login");
      } else {
        toast(err.response?.data?.message || "Could not add to bag", "e");
      }
    }
  };

  const removeCart = async (productId, color, size) => {
    try {
      const res = await removeCartItem({ productId, color, size });
      setCart(res.data?.items || []);
      toast("Item removed", "i", "✕");
    } catch (err) {
      console.log(err);
      toast(err.response?.data?.message || err.message, "e");
    }
  };

  const updQty = async (productId, color, size, d, currentQty = 1) => {
    try {
      if (currentQty + d < 1) {
        removeCart(productId, color, size);
        return;
      }

      const res = await addCartItem({
        productId,
        quantity: d,
        size,
        color,
      });
      setCart(res.data?.items || []);
    } catch (err) {
      console.log(err);
      toast(err.response?.data?.message || err.message, "e");
    }
  };
  const handleApplyCoupon = async (code) => {
    try {
      const res = await applyCoupon(code);
      setCart(res.data.cart?.items || []);
      toast(
        `Coupon applied! Saved ₹${res.data.discountAmount || 0}`,
        "s",
        "🏷️",
      );
    } catch (err) {
      toast("Invalid coupon", "e");
    }
  };
  const toggleWish = async (prod) => {
    const pid = prod._id || prod.id;
    setWish((prev) => {
      const has = prev.find((i) => (i._id || i.id) === pid);
      if (has) {
        toast("Removed from wishlist", "i", "♡");
        return prev.filter((i) => (i._id || i.id) !== pid);
      }
      toast("Saved to wishlist!", "s", "♥");
      return [...prev, prod];
    });

    if (currentUser) {
      try {
        await toggleApiWishlist(pid);
      } catch (e) {
        console.error("Wishlist sync error:", e);
      }
    }
  };

  const cartTotal = Array.isArray(cart)
    ? cart.reduce((s, i) => {
        const p = i.product || i;
        const price = p.price || i.price || 0;
        const qty = i.quantity || i.qty || 1;
        return s + price * qty;
      }, 0)
    : 0;

  const cartCnt = Array.isArray(cart)
    ? cart.reduce((s, i) => s + (i.quantity || i.qty || 1), 0)
    : 0;

  // ── Called by CheckoutModal when payment is confirmed ──
  const handleNav = (cat) => {
    setNavFilt(cat);
    const el = document.querySelector(".prods");
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    if (view !== "home") setView("home");
  };

  const handleOrderPlaced = (order) => {
    if (order) {
      setPlacedOrders((prev) => [order, ...prev]);
      setCart([]);
    }
    // Do NOT setCO(false) here — openDashboard will close it
  };

  // ── Called immediately after payment — closes checkout, opens dashboard ──
  const openDashboard = () => {
    setCO(false);
    setCartOpen(false);
    setWishOpen(false);
    setView("dashboard");
  };

  const backdrop = cartOpen || wishOpen;

  // ── Full-page views (take over entire screen) ──
  if (view === "login")
    return (
      <LoginPage
        onLogin={(user) => {
          setCurrentUser(user);
          setView(null);
          toast(`Welcome back, ${user.name}!`, "s", "✦");
        }}
        onSwitchToSignup={() => setView("signup")}
        onClose={() => setView(null)}
      />
    );

  if (view === "signup")
    return (
      <SignupPage
        onSignup={(user) => {
          setCurrentUser(user);
          setView(null);
          toast(`Welcome to Taneira, ${user.name}!`, "s", "🎉");
        }}
        onSwitchToLogin={() => setView("login")}
        onClose={() => setView(null)}
      />
    );

  if (view === "dashboard")
    return (
      <DashboardPage
        user={currentUser || { name: "Guest", username: "guest" }}
        newOrders={placedOrders}
        onClose={() => setView(null)}
        onLogout={() => {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setCurrentUser(null);
          setCart([]);
          setView(null);
          toast("Logged out successfully", "i", "✦");
        }}
      />
    );

  // ── Main store ──
  return (
    <>
      {backdrop && (
        <div
          className="cs-bk"
          onClick={() => {
            setCartOpen(false);
            setWishOpen(false);
          }}
        />
      )}

      {searchOpen && (
        <SearchOverlay
          onClose={() => setSearch(false)}
          prods={PRODS}
          addToCart={addToCart}
        />
      )}
      {menuOpen && (
        <MobileMenu
          onClose={() => setMenu(false)}
          onLogin={() => {
            setMenu(false);
            setView("login");
          }}
          onSignup={() => {
            setMenu(false);
            setView("signup");
          }}
        />
      )}
      {qv && (
        <ProdModal
          prod={qv}
          onClose={() => setQv(null)}
          addToCart={addToCart}
          toggleWish={toggleWish}
          wishlist={wishlist}
        />
      )}

      {/* Checkout — full-screen overlay */}
      {checkout && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 800,
            background: "rgba(0,0,0,.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(4px)",
          }}
        >
          <CheckoutModal
            cart={cart}
            total={cartTotal}
            onClose={() => setCO(false)}
            onOrderPlaced={handleOrderPlaced}
            onOpenDashboard={openDashboard}
            onApplyCoupon={handleApplyCoupon}
          />
        </div>
      )}

      <CartSidebar
        open={cartOpen}
        cart={cart}
        total={cartTotal}
        onClose={() => setCartOpen(false)}
        onRemove={removeCart}
        onQty={updQty}
        onCheckout={() => {
          setCartOpen(false);
          setCO(true);
        }}
      />
      <WishlistSidebar
        open={wishOpen}
        wishlist={wishlist}
        onClose={() => setWishOpen(false)}
        onAdd={addToCart}
        onRem={toggleWish}
      />

      <div className="topbar">
        <span>Free shipping above ₹2,999</span>
        <span className="topbar-sep">|</span>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setView("dashboard");
          }}
        >
          Track Order
        </a>
        <span className="topbar-sep">|</span>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            toast("Store locator opening...", "i", "📍");
          }}
        >
          Find a Store
        </a>
        <span className="topbar-sep">|</span>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            toast("COD available on orders above ₹999", "i", "💵");
          }}
        >
          COD Available
        </a>
      </div>

      <Navbar
        cartCnt={cartCnt}
        wishCnt={wishlist.length}
        onCart={() => {
          setCartOpen(true);
          setWishOpen(false);
        }}
        onWish={() => {
          setWishOpen(true);
          setCartOpen(false);
        }}
        onSearch={() => setSearch(true)}
        onMenu={() => setMenu(true)}
        currentUser={currentUser}
        onLogin={() => setView("login")}
        onSignup={() => setView("signup")}
        onLogout={handleLogout}
        onDashboard={() => setView("dashboard")}
        onNav={handleNav}
      />

      <main>
        <HeroSec onNav={handleNav} onOpenModal={setModalOpen} />
        <MarqueeBand />
        <CatsSec onNav={handleNav} />
        <ProdsSec
          products={products}
          addToCart={addToCart}
          toggleWish={toggleWish}
          wishlist={wishlist}
          onQV={setQv}
          navFilt={navFilt}
          onNav={handleNav}
        />
        <HerSec />
        <CustSec addToCart={addToCart} />
        <TstSec />
        <NlSec />
      </main>

      {modalOpen === "lookbook" && (
        <LookbookModal onClose={() => setModalOpen(null)} />
      )}
      {modalOpen === "appointment" && (
        <AppointmentModal onClose={() => setModalOpen(null)} />
      )}

      <Footer />
      <LiveChat />
    </>
  );
}
