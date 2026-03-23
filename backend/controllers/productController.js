const Product = require("../models/Product");

// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  try {
    const { category, keyword, bestseller, sort, tag } = req.query;

    let query = {};

    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { brand: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } },
      ];
    }

    if (category && category.toLowerCase() !== "all") {
      if (category.toLowerCase() === "sale") {
        query.discount = { $gt: 0 };
      } else {
        query.category = { $regex: `^${category}$`, $options: "i" };
      }
    }

    if (tag === "bestseller") {
      query.$or = [{ tags: { $in: ["bestseller"] } }, { isBestseller: true }];
    }

    if (tag) {
      if (tag.toLowerCase() === "sale") {
        query.discount = { $gt: 0 };
      } else {
        query.tags = { $in: [tag.toLowerCase()] };
      }
    }

    let products = Product.find(query);

    if (sort === "new") {
      products = products.sort({ createdAt: -1 });
    } else if (sort === "priceLow") {
      products = products.sort({ price: 1 });
    } else if (sort === "priceHigh") {
      products = products.sort({ price: -1 });
    } else if (sort === "popular") {
      products = products.sort({ numReviews: -1 });
    } else if (sort === "topRated") {
      products = products.sort({ rating: -1 });
    }

    const result = await products;

    // 🔥 Handle empty case
    if (result.length === 0) {
      return res.json({
        success: true,
        products: [],
        message: "Awaiting new arrivals",
      });
    }

    res.json({
      success: true,
      products: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// GET PRODUCT BY ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ADD PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
