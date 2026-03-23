const express = require("express");
const router = express.Router();

const {
  getWishlist,
  toggleWishlist,
} = require("../controllers/wishListController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getWishlist);
router.post("/", protect, toggleWishlist);

module.exports = router;
