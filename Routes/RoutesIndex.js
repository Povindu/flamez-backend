const express = require("express");
const router = express.Router();

const AuthRoutes = require("./AdminAuth.Routes");




router.use("/auth", AuthRoutes);



router.get("/", (req, res) => {
  res.status(200).json({ message: "CareSync Test Endpoint v1" });
});


module.exports = router;