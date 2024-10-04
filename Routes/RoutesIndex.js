const express = require("express");
const router = express.Router();

const AuthMiddleware = require("../middleware/AuthMiddleware");

const AuthRoutes = require("./AdminAuth.Routes");
const ServiceItemRoutes = require("./ServiceItems.Routes");
const TestaRoutes = require("./Testamonials.Routes");
const ImageUploadRoutes = require("./ImageUpload.Routes");

router.use("/auth", AuthRoutes);
router.use("/services", ServiceItemRoutes);
router.use("/testa", TestaRoutes);
router.use("/upload", AuthMiddleware, ImageUploadRoutes);

router.get("/", (req, res) => {
  res.status(200).json({ message: "Flamez Test Endpoint v1" });
});

module.exports = router;
