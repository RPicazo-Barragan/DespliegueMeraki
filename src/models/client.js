const mongoose = require("mongoose");

// schema de cliente
const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
  },
  lastName: {
    type: String,
    required: true,
    min: 3,
  },
  email: {
    type: String,
    required: true,
    match: /^.+@.+\..+$/,
  },
  password: {
    type: String,
    required: true,
    min: 1,
  },
  phone: {
    type: Number,
    required: true,
    min: 10,
  },
  adress: {
    type: String,
    required: true,
  },
  register: {
    type: Date,
    default: Date.now,
  },
  profilepicture: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("clients", clientSchema);
