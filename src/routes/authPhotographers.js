const express = require("express");
const router = express.Router();
const photographer = require("../usecases/photograper");

router.post("/sign-up", async (request, response) => {
  try {
    const signedUpPhotographer = await photographer.signup(request.body);
    response.json({
      success: true,
      data: {
        photograper: signedUpPhotographer,
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
    const token = await photographer.login(email, password);
    response.json({
      success: true,
      data: {
        token,
      },
      message: "Sesion iniciada",
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
