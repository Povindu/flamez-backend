const {
  createTestiItem,
  editTestiItem,
  getOneTestiItem,
  getAllTestiItems,
  deleteTestiItem,
} = require("../Controllers/Testi.Controller");

const AuthMiddleware = require("../middleware/AuthMiddleware");

const express = require("express");
const router = express.Router();

router.post("/create", createTestiItem);

router.patch("/edit/:id", editTestiItem);

router.get("/getOne/:id", getOneTestiItem);

router.get("/getAll", getAllTestiItems);

router.delete("/delete/:id", deleteTestiItem);

module.exports = router;
