const express = require("express");
const router = express.Router();
const librosController = require("../controllers/librosController");

// Definir las rutas para libros
router.get("/", librosController.obtenerLibros);
router.post("/", librosController.agregarLibro);
router.put("/:id", librosController.actualizarLibro);
router.delete("/:id", librosController.eliminarLibro);

module.exports = router;
