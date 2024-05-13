// import { v2 as cloudinary } from "cloudinary"
const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: "dxbzkp3nt",
  api_key: "441969433678154",
  api_secret: "3LZXlemc6CIz6JPVli5llbT9d7I",
});

const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;
  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("File uploaded on cloudinary successfully:", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (e) {
    fs.unlinkSync(localFilePath);
    console.log(e, "while uploading file on cloudinary in cloudinary.js:");
  }
};

module.exports = { uploadOnCloudinary };
