const {
  createServiceItem,
  editServiceItem,
  getOneServiceItem,
  getAllServiceItems,
  deleteServiceItem,
} = require("../Controllers/ServiceItems.Controller");

const AuthMiddleware = require("../middleware/AuthMiddleware");

const express = require("express");
const router = express.Router();

router.post("/create", AuthMiddleware, createServiceItem);

router.patch("/edit/:id", AuthMiddleware, editServiceItem);

router.get("/getOne/:id", AuthMiddleware, getOneServiceItem);

router.get("/getAll", getAllServiceItems);

router.delete("/delete/:id", AuthMiddleware, deleteServiceItem);

module.exports = router;
