const express = require("express");
const router = express.Router();

const offers = require("../usecases/offers");
const auth = require("../middlewares/auth");

router.get("/", auth, async (request, response) => {
  try {
    const allOffers = await offers.getAll();
    response.json({
      success: true,
      data: {
        offers: allOffers,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

router.get("/:id", auth, async (request, response) => {
  try {
    const offerId = request.params.id;
    const offer = await offers.getById(offerId);
    response.json({
      succes: true,
      data: {
        offer,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

router.post("/", auth, async (request, response) => {
  try {
    console.log("offer: ", request.offer);
    const newOfferData = request.body;
    const newOffer = await offers.create(newOfferData);
    response.json({
      success: true,
      data: {
        newOffer,
      },
      message: "Se ha creado correctamente ",
    });
  } catch (error) {
    response.status(error.status || 400);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

router.patch("/:id", auth, async (request, response) => {
  try {
    const id = request.params.id;
    const dataToUpdate = request.body;
    const offerUpdated = await offers.update(id, dataToUpdate);
    response.json({
      success: true,
      data: {
        offerUpdated,
      },
      message: "Offer updated",
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

router.delete("/:id", auth, async (request, response) => {
  try {
    const id = request.params.id;
    const offerToDelete = await clients.deletee(id);
    response.json({
      success: true,
      data: {
        offerToDelete,
      },
      message: "Offer deleted",
    });
  } catch (error) {
    response.status(error.status || 400);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
