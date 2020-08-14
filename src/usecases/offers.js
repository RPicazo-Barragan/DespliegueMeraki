const offers = require("../models/offer");

function getAll() {
  return offers.find();
}

function getById(offerId) {
  return offers.findById(offerId);
}

function create(offerData) {
  return offers.create(offerData);
}

function update(offerId, offerData) {
  return offers.findByIdAndUpdate(offerId, offerData);
}

function deletee(offerId) {
  return offers.findOneAndDelete(offerId);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deletee,
};
