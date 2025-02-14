const express = require("express");
const router = express.Router();
const editoraController = require("../controllers/editorasController");

// Obtener todas las editoras
router.get("/", editoraController.obtenerEditoras);

// Agregar una nueva editora
router.post("/", editoraController.agregarEditora);

// Actualizar una editora existente
router.put("/:id", editoraController.actualizarEditora);

// Eliminar una editora
router.delete("/:id", editoraController.eliminarEditora);

module.exports = router;  // 🚀 Asegúrate de que esta línea está presente
