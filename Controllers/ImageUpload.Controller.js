const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const Multer = require("multer");

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

async function handleUpload(file) {
  console.log("file", file);
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "image",
  });
  return res;
}

const uploadImage = async (req, res) => {
  console.log("uploadImage");

  upload.single("my_file");

  async (req, res) => {
    console.log("efef");
    try {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const cldRes = await handleUpload(dataURI);
      res.json(cldRes);
      console.log(cldRes);
    } catch (error) {
      console.log(error);
      res.send({
        message: error.message,
      });
    }
  };

  res.send("Image uploaded");
};

module.exports = {
  uploadImage,
};
