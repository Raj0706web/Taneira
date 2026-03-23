const Wishlist = require("../models/Wishlist");

// ❤️ GET WISHLIST
exports.getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate(
      "products",
    );

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        products: [],
      });
    }

    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔁 TOGGLE WISHLIST
exports.toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        products: [],
      });
    }

    const index = wishlist.products.findIndex(
      (id) => id.toString() === productId,
    );

    if (index > -1) {
      // ❌ Remove
      wishlist.products.splice(index, 1);
    } else {
      // ❤️ Add
      wishlist.products.push(productId);
    }

    await wishlist.save();

    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
