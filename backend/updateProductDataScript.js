const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "data", "productData.js");
let content = fs.readFileSync(dataPath, "utf8");

// We'll require it to get the array
const productData = require("./data/productData.js");

// Modify each product to ensure 3 images
const updatedProducts = productData.map((p) => {
  if (p.images && p.images.length === 1) {
    p.images = [p.images[0], p.images[0], p.images[0]];
  } else if (!p.images && p.image) {
    p.images = [p.image, p.image, p.image];
  }
  if (!p.image && p.images && p.images.length > 0) {
    p.image = p.images[0];
  }
  return p;
});

// Write it back
const newContent = `const productData = ${JSON.stringify(updatedProducts, null, 2)};\n\nmodule.exports = productData;\n`;

fs.writeFileSync(dataPath, newContent, "utf8");
console.log("productData.js updated successfully with 3 images per product!");
