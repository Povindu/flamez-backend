const {
  createServiceItem,
  editServiceItem,
  getOneServiceItem,
  getAllServiceItems,
} = require("../Controllers/ServiceItems.Controller");

const express = require("express");
const router = express.Router();

router.post("/create", createServiceItem);

router.patch("/edit/:id", editServiceItem);

router.get("/getOne/:id", getOneServiceItem);

router.get("/getAll", getAllServiceItems);

module.exports = router;
