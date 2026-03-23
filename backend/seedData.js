const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");
const productData = require("./data/productData");

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // Clean DB
    await Product.deleteMany();
    await Product.insertMany(productData);

    console.log("✅ Products Seeded Successfully from productData.js!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
