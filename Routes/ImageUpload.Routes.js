const express = require("express");
const router = express.Router();
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
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "image",
  });
  return res;
}

router.post("/", upload.single("my_file"), async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    const resdata = {
      url: cldRes.url,
      secure_url: cldRes.secure_url,
      public_id: cldRes.public_id,
    };
    res.json(resdata);
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
});

module.exports = router;

