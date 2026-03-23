const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();
const mongoose = require("mongoose");
const cloudinary = require("./config/cloudinary");
const fs = require("fs");
const path = require("path");
const Product = require("./models/Product");

const chunkArray = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const uploadAndGenerate = async () => {
  const basePath = path.join(__dirname, "images");
  const categories = fs.readdirSync(basePath);

  let products = [];

  for (const category of categories) {
    const categoryPath = path.join(basePath, category);

    if (!fs.lstatSync(categoryPath).isDirectory()) continue;

    const files = fs.readdirSync(categoryPath);

    let uploadedImages = [];

    // ✅ Upload all images
    for (const file of files) {
      const filePath = path.join(categoryPath, file);

      const result = await cloudinary.uploader.upload(filePath, {
        folder: `products/${category}`,
      });

      uploadedImages.push(result.secure_url);
    }

    // ✅ Group into 3 images per product
    const grouped = chunkArray(uploadedImages, 3);

    // ❗ Optional: remove incomplete group
    const validGroups = grouped.filter((group) => group.length === 3);

    // ✅ Create products
    validGroups.forEach((imgs, i) => {
      products.push({
        name: `${category} Collection ${i + 1}`,
        brand: "Taneira",
        description: `Premium ${category} wear.`,
        features: ["Premium fabric", "Elegant design"],
        care: ["Dry clean only"],
        sizes: ["S", "M", "L"],
        price: 2000 + i * 200,
        originalPrice: 3000 + i * 200,
        discount: 25,
        category: category,
        stock: 20,
        colors: ["red", "blue"],
        rating: 4.2,
        numReviews: 50,
        tags: ["sale", category],

        // 🔥 MULTIPLE IMAGES
        image: imgs[0],
        images: imgs,
      });
    });
  }

  return products;
};

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // ⚠️ Clean DB (recommended)
    await Product.deleteMany();

    const products = await uploadAndGenerate();

    await Product.insertMany(products);

    console.log("🔥 Products Seeded Successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
