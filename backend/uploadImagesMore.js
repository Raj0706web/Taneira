require("dotenv").config();
const cloudinary = require("./config/cloudinary");
const fs = require("fs");
const path = require("path");

const uploadImages = async () => {
  const basePath = path.join(__dirname, "images");

  const categories = fs.readdirSync(basePath);

  for (const category of categories) {
    const categoryPath = path.join(basePath, category);

    if (fs.lstatSync(categoryPath).isDirectory()) {
      const files = fs.readdirSync(categoryPath);

      for (const file of files) {
        try {
          const filePath = path.join(categoryPath, file);

          const result = await cloudinary.uploader.upload(filePath, {
            folder: `products/${category}`, // 🔥 dynamic folder
          });

          console.log(`Uploaded (${category}):`, result.secure_url);
        } catch (err) {
          console.log("Error uploading", file, err);
        }
      }
    }
  }
};

uploadImages();
