const express = require("express");
const router = express.Router();
const autoresController = require("../controllers/autoresController");

// Definir las rutas para autores
router.get("/", autoresController.obtenerAutores);
router.post("/", autoresController.agregarAutor);
router.put("/:id", autoresController.actualizarAutor);
router.delete("/:id", autoresController.eliminarAutor);

module.exports = router;
