const {
  createServiceItem,
  editServiceItem,
  getOneServiceItem,
  getAllServiceItems,
  deleteServiceItem,
} = require("../Controllers/ServiceItems.Controller");

const express = require("express");
const router = express.Router();

router.post("/create", createServiceItem);

router.patch("/edit/:id", editServiceItem);

router.get("/getOne/:id", getOneServiceItem);

router.get("/getAll", getAllServiceItems);

router.delete("/delete/:id", deleteServiceItem);

module.exports = router;
