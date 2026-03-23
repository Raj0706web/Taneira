const Order = require("../models/Order");
const Cart = require("../models/Cart");

// 🛒 CREATE ORDER (Checkout)
exports.createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 🧮 Calculate prices
    const itemsPrice = cart.items.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);

    const discountAmount = cart.discountAmount || 0;
    const totalPrice = itemsPrice - discountAmount;

    // 📦 Create order
    const order = await Order.create({
      user: req.user._id,

      orderItems: cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
        price: item.product.price,
      })),

      shippingAddress,
      paymentMethod,

      itemsPrice,
      discountAmount,
      totalPrice,
    });

    // 🧹 Clear cart after order
    cart.items = [];
    cart.discountAmount = 0;
    cart.totalPrice = 0;
    cart.coupon = undefined;

    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "orderItems.product",
    );

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
