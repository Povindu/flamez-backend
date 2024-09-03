const express = require("express");
const router = express.Router();

const AuthMiddleware = require("../middleware/AuthMiddleware");

const AuthRoutes = require("./AdminAuth.Routes");
const ServiceItemRoutes = require("./ServiceItems.Routes");
const ImageUploadRoutes = require("./ImageUpload.Routes");


router.use("/auth", AuthRoutes);
router.use("/services", AuthMiddleware, ServiceItemRoutes);
router.use("/upload", ImageUploadRoutes, );



router.get("/", (req, res) => {
  res.status(200).json({ message: "Flamez Test Endpoint v1" });
});


module.exports = router;