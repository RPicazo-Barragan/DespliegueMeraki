const mongoose = require("mongoose");

// schema for laboral offer
const offerSchema = new mongoose.Schema({
  clientid: {
    type: Number,
    required: true,
  },
  photografhid: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
    max: 30,
  },
  eventtype: {
    type: String,
    required: true,
  },
  eventadress: {
    type: String,
    required: true,
  },
  eventdate: {
    type: String,
    required: true,
  },
  eventduration: {
    type: String,
    required: true,
  },
  postdate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("offers", offerSchema);
