require("dotenv").config();
const cloudinary = require("./config/cloudinary");
const fs = require("fs");
const path = require("path");

const uploadImages = async () => {
  const folderPath = path.join(__dirname, "images");

  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    try {
      const filePath = path.join(folderPath, file);

      const result = await cloudinary.uploader.upload(filePath, {
        folder: "products"
      });

      console.log("Uploaded:", result.secure_url);
    } catch (err) {
      console.log("Error uploading", file, err);
    }
  }
};

uploadImages();