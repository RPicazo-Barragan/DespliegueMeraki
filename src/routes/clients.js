const express = require("express");
const router = express.Router();

const clients = require("../usecases/clients");
const auth = require("../middlewares/auth");

router.get("/", async (request, response) => {
  try {
    const allClients = await clients.getAll();
    response.json({
      success: true,
      data: {
        clients: allClients,
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

router.get("/:id", async (request, response) => {
  try {
    const clientId = request.params.id;
    const client = await clients.getById(clientId);
    response.json({
      success: true,
      data: {
        client,
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

router.patch("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const dataToUpdate = request.body;
    const clientUpdated = await clients.update(id, dataToUpdate);
    response.json({
      success: true,
      data: {
        clientUpdated,
      },
    });
  } catch (error) {
    response.status(error.status || 400);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const clientToDelete = await clients.deletee(id);
    response.json({
      success: true,
      data: {
        clientToDelete,
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
