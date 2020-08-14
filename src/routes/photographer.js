const express = require("express");
const router = express.Router();

const photographers = require("../usecases/photograper");
const auth = require("../middlewares/auth");

router.get("/", auth, async (request, response) => {
  try {
    const allPhotograpers = await photographers.getAll();
    response.json({
      success: true,
      data: {
        photograpers: allPhotograpers,
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
    const photographerId = request.params.id;
    const photographer = await photographers.getById(photographerId);
    response.json({
      success: true,
      data: {
        photographer,
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

router.patch("/:id", auth, async (request, response) => {
  try {
    const id = request.params.id;
    const dataToUpdate = request.body;
    const photographerUpdated = await photographers.update(id, dataToUpdate);
    response.json({
      success: true,
      data: {
        photographerUpdated,
      },
      message: "Datos actualizados correctamente",
    });
  } catch (error) {
    response.status(error.status || 400);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

router.delete("/:id", auth, async (request, response) => {
  try {
    const id = request.params.id;
    const photographerToDelete = await photographers.deletee(id);
    response.json({
      success: true,
      data: {
        photographerToDelete,
      },
      message: "Se ha borrado correctamente",
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
