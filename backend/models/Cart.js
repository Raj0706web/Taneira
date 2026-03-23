const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },

        quantity: {
          type: Number,
          default: 1,
        },

        color: {
          type: String,
          required: true,
        },

        size: {
          type: String,
          required: true,
        },
        coupon: {
          code: String,
          discount: Number,
        },

        discountAmount: {
          type: Number,
          default: 0,
        },

        totalPrice: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Cart", cartSchema);
