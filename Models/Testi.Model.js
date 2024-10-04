const mongoose = require("mongoose");

const TestiItem = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    imageLink: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TestiItem", TestiItem);
