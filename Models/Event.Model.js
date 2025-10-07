const mongoose = require("mongoose");

const EventItem = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date:{
      type: Date,
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

module.exports = mongoose.model("EventItem", EventItem);
