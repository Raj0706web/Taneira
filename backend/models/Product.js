const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    brand: String,

    description: String,

    features: [String],

    care: [String],

    sizes: [String],

    price: {
      type: Number,
      required: true,
    },

    originalPrice: Number,

    discount: Number,

    image: String,

    images: [String], // multiple images

    category: String,

    stock: Number,

    colors: [String], // ["red", "green", "black"]

    isBestseller: {
      type: Boolean,
      default: false,
    },

    tags: {
      type: [String],
      default: [],
    },

    rating: {
      type: Number,
      default: 0,
    },

    numReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
