const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// The original .env used the misspelled COULD_* names; accept both spellings.
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || process.env.COULD_NAME,
  api_key: process.env.CLOUD_API_KEY || process.env.COULD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET || process.env.COULD_API_SECRET,
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Syncpick",
    allowed_formats: ["png", "jpg", "jpeg"],
  },
});
module.exports = { storage, cloudinary };
