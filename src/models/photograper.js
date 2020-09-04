const mongoose = require("mongoose");

//esquema for Photograper
const photograperSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
  },
  lastName: {
    type: String,
    required: false,
    min: 3,
  },
  category: {
    type: Array,
    required: true,
  },
  email: {
    type: String,
    min: 5,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 1,
  },

  imageProfile: {
    type: String,
  },

  portfolio: {
    type: String,
    required: true,
  },

  website: {
    type: String,
  },
  facebook: {
    type: String,
    required: true,
  },
  instagram: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
  },

  description: {
    type: String,
    required: true,
  },
  imagesUrl: {
    type: Array,
  },
});

module.exports = mongoose.model("photograpers", photograperSchema);
