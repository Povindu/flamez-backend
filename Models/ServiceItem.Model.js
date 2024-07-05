const mongoose = require("mongoose");


const ServiceItem = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    photoArray: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceItem", ServiceItem);
