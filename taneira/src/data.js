// ══ TOAST UTILITY ══
export function toast(msg, type = "i", icon = "✦") {
  const c = document.getElementById("tc");
  const el = document.createElement("div");
  el.className = `t ${type}`;
  el.innerHTML = `<span class="t-ico">${icon}</span><span class="t-msg">${msg}</span>`;
  c.appendChild(el);
  setTimeout(() => {
    el.classList.add("t-out");
    setTimeout(() => el.remove(), 300);
  }, 3000);
}

// ══ PRODUCTS DATA ══
export const PRODS = [
  {
    id: 1,
    name: "Kadhua Banarasi Silk Saree",
    price: 18500,
    mrp: 22000,
    tag: "Bestseller",
    cat: "Sarees",
    weave: "Banarasi",
    color: "#8B1A1A",
    icon: "🥻",
    rating: 4.8,
    rev: 234,
    desc: "Pure Katan silk with intricate Kadhua weaving technique. Each saree takes 15–20 days to hand-weave by master craftspeople in Varanasi.",
    sizes: ["5.5m", "6m", "6.5m"],
    colors: ["#8B1A1A", "#1a3a2a", "#3a1a4a", "#4a2a0a"],
    features: ["GI Tagged", "Handwoven", "100% Silk", "Free Care Kit"],
  },
  {
    id: 2,
    name: "Kanjivaram Temple Border",
    price: 24000,
    mrp: 28000,
    tag: "New",
    cat: "Sarees",
    weave: "Kanjivaram",
    color: "#1a3a2a",
    icon: "🪡",
    rating: 4.9,
    rev: 187,
    desc: "Authentic Kanjivaram silk with a traditional temple border and rich zari from Kanchipuram weavers. A bridal favourite.",
    sizes: ["5.5m", "6m", "6.5m"],
    colors: ["#1a3a2a", "#8B1A1A", "#2a0a3a", "#4a2a0a"],
    features: [
      "GI Tagged",
      "Handwoven",
      "Pure Zari",
      "Certificate of Authenticity",
    ],
  },
  {
    id: 3,
    name: "Anarkali Chanderi Kurta Set",
    price: 6800,
    mrp: 8500,
    tag: "Sale",
    cat: "Kurtas",
    weave: "Chanderi",
    color: "#3a1a4a",
    icon: "👗",
    rating: 4.6,
    rev: 142,
    desc: "Lightweight Chanderi silk-cotton blend with delicate meenakari bootis. Includes matching pants and dupatta.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["#3a1a4a", "#1a3a2a", "#8B1A1A", "#4a2a0a"],
    features: [
      "Silk-Cotton Blend",
      "3-piece Set",
      "Hand Block Print",
      "Machine Wash Safe",
    ],
  },
  {
    id: 4,
    name: "Bridal Lehenga – Crimson Gold",
    price: 54000,
    mrp: 62000,
    tag: "Exclusive",
    cat: "Lehengas",
    weave: "Zardozi",
    color: "#4a2a0a",
    icon: "✨",
    rating: 5.0,
    rev: 67,
    desc: "Handcrafted bridal lehenga with real zari Zardozi embroidery. Comes with blouse piece and dupatta. Made to order.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["#4a2a0a", "#8B1A1A", "#3a1a4a"],
    features: [
      "Made to Order",
      "Real Zari",
      "3-piece Bridal Set",
      "Free Alterations",
    ],
  },
  {
    id: 5,
    name: "Pochampally Ikat Saree",
    price: 9500,
    mrp: 11000,
    tag: "Heritage",
    cat: "Sarees",
    weave: "Ikat",
    color: "#0a2a3a",
    icon: "🎨",
    rating: 4.7,
    rev: 189,
    desc: "Geometric Ikat patterns dyed before weaving on handloom. Each saree is completely unique — a true collector's piece.",
    sizes: ["5.5m", "6m", "6.5m"],
    colors: ["#0a2a3a", "#8B1A1A", "#2a3a0a"],
    features: [
      "GI Tagged",
      "Resist Dyeing",
      "Each Piece Unique",
      "Handloom Certified",
    ],
  },
  {
    id: 6,
    name: "Bandhani Silk Kurta Set",
    price: 12200,
    mrp: 14500,
    tag: "New",
    cat: "Kurtas",
    weave: "Bandhani",
    color: "#2a0a3a",
    icon: "🌀",
    rating: 4.5,
    rev: 98,
    desc: "Hand-tied Bandhani on pure silk by Jaipur artisans. Includes matching pants and dupatta for a complete look.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["#2a0a3a", "#8B1A1A", "#1a3a2a"],
    features: ["Hand Tied", "Pure Silk", "3-piece Set", "Jaipur Craft"],
  },
  {
    id: 7,
    name: "Paithani Festive Saree",
    price: 31000,
    mrp: 36000,
    tag: "Festive",
    cat: "Sarees",
    weave: "Paithani",
    color: "#2a3a0a",
    icon: "🦚",
    rating: 4.9,
    rev: 211,
    desc: "Maharashtrian Paithani with peacock motifs and gold zari border. UNESCO-recognised weaving tradition from Paithan.",
    sizes: ["5.5m", "6m", "6.5m"],
    colors: ["#2a3a0a", "#8B1A1A", "#0a2a3a"],
    features: ["UNESCO Recognised", "Peacock Motifs", "Gold Zari", "GI Tagged"],
  },
  {
    id: 8,
    name: "Lehenga – Ivory & Rose Gold",
    price: 41000,
    mrp: 48000,
    tag: "Wedding",
    cat: "Lehengas",
    weave: "Embroidery",
    color: "#3a1a1a",
    icon: "💛",
    rating: 4.8,
    rev: 53,
    desc: "Ivory silk lehenga with delicate rose gold thread embroidery. Ideal for wedding receptions and sangeet.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["#f5f0e8", "#d4a84b", "#3a1a1a"],
    features: [
      "Rose Gold Thread",
      "Sangeet Perfect",
      "2-piece Set",
      "Dry Clean Only",
    ],
  },
];

export const TAGCOL = {
  Bestseller: "#5c1a1a",
  New: "#1a3a2a",
  Sale: "#c0392b",
  Exclusive: "#b8872a",
  Heritage: "#0a2a3a",
  Festive: "#2a3a0a",
  Wedding: "#3a1a4a",
};
export const TAGTXT = { Exclusive: "#faf6f0" };

export const CATS = [
  { name: "Sarees", count: "420+ styles", emoji: "🥻", color: "#5c1a1a" },
  { name: "Kurtas", count: "310+ styles", emoji: "👘", color: "#1a3a2a" },
  { name: "Lehengas", count: "180+ styles", emoji: "✨", color: "#3a1a4a" },
  { name: "Festive", count: "260+ styles", emoji: "🌿", color: "#3a2a0a" },
  { name: "Bridal", count: "90+ styles", emoji: "💛", color: "#4a1a1a" },
  { name: "Sale", count: "140+ styles", emoji: "🎀", color: "#1a2a4a" },
];

export const SLIDES = [
  {
    hl: ["The Art of", "Handwoven Silk"],
    sub: "Banarasi & Kanjivaram Sarees",
    tag: "New Collection 2026",
    cta: "Explore Sarees",
    cta2: "View Lookbook",
    bg: "linear-gradient(135deg,#100404,#3d1010,#5c1a1a)",
  },
  {
    hl: ["Wear Your", "Roots Proudly"],
    sub: "Handcrafted Kurtas & Festive Sets",
    tag: "Festive Edit",
    cta: "Shop Kurtas",
    cta2: "See Lookbook",
    bg: "linear-gradient(135deg,#060e04,#1a3a12,#2a5c1a)",
  },
  {
    hl: ["Bridal Dreams", "Woven in Gold"],
    sub: "Exclusive Lehenga Collection",
    tag: "Bridal 2026",
    cta: "View Lehengas",
    cta2: "Book Appointment",
    bg: "linear-gradient(135deg,#0e0804,#3a2008,#5c3510)",
  },
];

export const WEAVES = [
  "Banarasi",
  "Kanjivaram",
  "Chanderi",
  "Paithani",
  "Ikat",
  "Bandhani",
  "Patola",
  "Jamdani",
  "Tussar",
  "Sambalpuri",
];
export const OCCASIONS = [
  "Daily Wear",
  "Festive",
  "Wedding",
  "Reception",
  "Engagement",
  "Office",
  "Party",
  "Anniversary",
];
export const BORDERS = [
  "Zari Gold",
  "Zari Silver",
  "Contrast Silk",
  "Plain",
  "Meenakari",
  "Woven Motif",
];
export const MOTIFS = [
  "🌸 Floral",
  "🦚 Peacock",
  "🌿 Paisley",
  "◆ Geometric",
  "🐘 Elephant",
  "⭐ Stars",
  "🌙 Crescent",
  "Custom",
];
export const ZARI = [
  "Real Zari (Gold)",
  "Tested Zari",
  "Silver Zari",
  "No Zari",
  "Copper Zari",
];
export const FABCOLS = [
  "#8B1A1A",
  "#1a3a2a",
  "#3a1a4a",
  "#4a2a0a",
  "#0a2a3a",
  "#2a3a0a",
  "#f5f0e8",
  "#2a0a3a",
  "#d4a84b",
  "#0a1a2a",
  "#3a0a1a",
  "#1a1a3a",
];
export const SORTOPS = [
  "Recommended",
  "Price: Low to High",
  "Price: High to Low",
  "Newest First",
  "Most Popular",
  "Top Rated",
];
export const FILTERS = [
  "All",
  "New",
  "Sarees",
  "Kurtas",
  "Lehengas",
  "Festive",
  "Wedding",
  "Sale",
];

export const FOOTER_COLS = [
  {
    h: "Shop",
    items: [
      "Sarees",
      "Kurtas",
      "Lehengas",
      "Fabrics",
      "Accessories",
      "Gift Cards",
    ],
  },
  {
    h: "Collections",
    items: [
      "New Arrivals",
      "Festive Edit",
      "Bridal 2026",
      "Heritage Series",
      "Summer Weaves",
      "Sale",
    ],
  },
  {
    h: "Help",
    items: [
      "Size Guide",
      "Care Instructions",
      "Returns",
      "Track Order",
      "FAQs",
      "Contact Us",
    ],
  },
  {
    h: "Company",
    items: [
      "Our Story",
      "Weaver Stories",
      "Sustainability",
      "Press",
      "Careers",
      "Stores",
    ],
  },
];

export const NAV_LINKS = [
  "Sarees",
  "Kurtas",
  "Lehengas",
  "Festive",
  "Wedding",
  "Sale",
];

export const ORDERS_DATA = [
  {
    id: "TAN-2026-0481",
    name: "Kadhua Banarasi Silk Saree",
    status: "Delivered",
    date: "12 Mar 2026",
    price: "₹18,500",
    color: "#8B1A1A",
    sc: "#2a5c1a",
    sb: "rgba(42,92,26,.1)",
  },
  {
    id: "TAN-2026-0392",
    name: "Anarkali Chanderi Kurta Set",
    status: "Shipped",
    date: "18 Mar 2026",
    price: "₹6,800",
    color: "#3a1a4a",
    sc: "#1a3a5c",
    sb: "rgba(26,58,92,.1)",
  },
  {
    id: "TAN-2026-0318",
    name: "Pochampally Ikat Saree",
    status: "Processing",
    date: "20 Mar 2026",
    price: "₹9,500",
    color: "#0a2a3a",
    sc: "#b8872a",
    sb: "rgba(184,135,42,.12)",
  },
];

export const WISH_ITEMS_DEFAULT = [
  {
    id: 4,
    name: "Bridal Lehenga – Crimson Gold",
    price: 54000,
    weave: "Zardozi",
    color: "#4a2a0a",
    icon: "✨",
    tag: "Exclusive",
  },
  {
    id: 7,
    name: "Paithani Festive Saree",
    price: 31000,
    weave: "Paithani",
    color: "#2a3a0a",
    icon: "🦚",
    tag: "Festive",
  },
  {
    id: 2,
    name: "Kanjivaram Temple Border",
    price: 24000,
    weave: "Kanjivaram",
    color: "#1a3a2a",
    icon: "🪡",
    tag: "New",
  },
];
