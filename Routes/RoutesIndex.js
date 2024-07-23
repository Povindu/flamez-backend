const express = require("express");
const router = express.Router();

const AuthRoutes = require("./AdminAuth.Routes");
const ServiceItemRoutes = require("./ServiceItems.Routes");
const ImageUploadRoutes = require("./ImageUpload.Routes");


router.use("/auth", AuthRoutes);
router.use("/services", ServiceItemRoutes);
router.use("/upload", ImageUploadRoutes, );



router.get("/", (req, res) => {
  res.status(200).json({ message: "CareSync Test Endpoint v1" });
});


module.exports = router;