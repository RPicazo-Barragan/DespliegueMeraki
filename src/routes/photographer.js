const express = require("express");
const router = express.Router();

const photographers = require("../usecases/photograper");
const auth = require("../middlewares/auth");
const upload = require("../lib/S3Upload");
const { request, response } = require("express");
const singleUpload = upload.array("photos", 7);

router.patch("/:id/upload", (req, res) => {
  singleUpload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
    try {
      // console.log(req.files);
      const id = req.params.id;
      const imageProfile = req.files[0].location; //Imagen de perfil
      //ARRAY para galeria
      const imagesUrl = []
      for (let i = 1; i < req.files.length; i++) {
        imagesUrl.push(req.files[i].location)

      }
      console.log(imagesUrl)
      /*       const imagesUrl = [
              req.files[1].location,
              req.files[2].location,
              req.files[3].location,
              req.files[4].location,
              req.files[5].location,
              req.files[6].location,
            ]; */
      const photographerUpdated = await photographers.update(id, {
        imageProfile,
        imagesUrl,
      });
      res.json({
        success: true,
        data: { photographerUpdated },
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  });
});

router.get("/", async (request, response) => {
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

router.get("/:id", async (request, response) => {
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
