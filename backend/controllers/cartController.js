const Cart = require("../models/Cart");
const coupons = require("../utils/coupons");
// 🟢 GET CART
exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
    );

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ➕ ADD TO CART (with color + size)
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity, color, size } = req.body;

    if (!color || !size) {
      return res.status(400).json({
        message: "Color and size are required",
      });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    // 🔥 Check same product + color + size
    const index = cart.items.findIndex(
      (item) =>
        item.product.toString() === productId &&
        item.color === color &&
        item.size === size,
    );

    if (index > -1) {
      cart.items[index].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, color, size });
    }

    cart.markModified("items");
    await cart.save();

    const updatedCart = await Cart.findById(cart._id).populate("items.product");

    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.removeFromCart = async (req, res) => {
  try {
    const { productId, color, size } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });

    cart.items = cart.items.filter(
      (item) =>
        !(
          item.product.toString() === productId &&
          item.color === color &&
          item.size === size
        ),
    );

    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// 🎟️ APPLY COUPON
exports.applyCoupon = async (req, res) => {
  try {
    const { code } = req.body;

    const discountPercent = coupons[code];

    if (!discountPercent) {
      return res.status(400).json({ message: "Invalid coupon" });
    }

    let cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
    );

    if (!cart) {
      return res.status(400).json({ message: "Cart not found" });
    }

    // 🧮 Calculate subtotal
    const subtotal = cart.items.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);

    const discountAmount = (subtotal * discountPercent) / 100;

    cart.coupon = {
      code,
      discount: discountPercent,
    };

    cart.discountAmount = discountAmount;
    cart.totalPrice = subtotal - discountAmount;

    await cart.save();

    res.json({
      message: "Coupon applied",
      cart,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
