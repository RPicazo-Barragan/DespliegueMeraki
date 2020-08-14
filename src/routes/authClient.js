const express = require("express");
const router = express.Router();
const client = require("../usecases/clients");

router.post("/sign-up", async (request, response) => {
  try {
    const signedUpClient = await client.signup(request.body); //continuar aqui
    response.json({
      success: true,
      data: {
        client: signedUpClient,
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

router.post("/sign-in", async (request, response) => {
  try {
    const { password, email } = request.body;
    const token = await client.login(email, password);
    response.json({
      success: true,
      data: {
        token,
      },
      message: "¡Iniciaste sesión!",
    });
  } catch (error) {
    response.status(401);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
