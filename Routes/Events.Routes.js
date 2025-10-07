const {
  createEventItem,
  editEventItem,
  getOneEventItem,
  getAllEventItems,
  deleteEventItem,
} = require("../Controllers/Event.Controller");

const AuthMiddleware = require("../middleware/AuthMiddleware");

const express = require("express");
const router = express.Router();

router.post("/create", AuthMiddleware, createEventItem);

router.patch("/edit/:id", AuthMiddleware, editEventItem);

router.get("/getOne/:id", AuthMiddleware, getOneEventItem);

router.get("/getAll", getAllEventItems);

router.delete("/delete/:id", AuthMiddleware, deleteEventItem);

module.exports = router;
