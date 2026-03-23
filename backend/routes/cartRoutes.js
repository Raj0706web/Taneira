const express = require("express");
const router = express.Router();

const {
  getCart,
  addToCart,
  removeFromCart,
  applyCoupon,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getCart);
router.post("/", protect, addToCart);
router.delete("/", protect, removeFromCart); // 👈 changed
router.post("/apply-coupon", protect, applyCoupon);

module.exports = router;
