const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SlotSchema = new Schema({
  slotUID: {
    type: String,
  },
  expertID: {
    type: String,
  },
  date: {
    type: Date,
  },
  startTime: {
    type: String,
  },
  duration: {
    type: Number,
  },
  status: {
    type: String,
  },
  services: {
    type: String,
  },
  isSlotBooked: {
    type: String,
  },
  services: {
    type: String,
  },
  price: {
    type: Number,
  },
  caretakerID: {
    type: String,
  },
  caretakerName:{
    type: String
  }
});

module.exports = slots = mongoose.model("slots", SlotSchema);
