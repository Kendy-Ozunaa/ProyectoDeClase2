const express = require("express");
const router = express.Router();
const tiposBibliografiaController = require("../controllers/tiposBibliografiaController");

router.get("/", tiposBibliografiaController.obtenerTipos);
router.post("/", tiposBibliografiaController.agregarTipo);
router.put("/:id", tiposBibliografiaController.actualizarTipo);
router.delete("/:id", tiposBibliografiaController.eliminarTipo);

module.exports = router;  // 🚀 Asegúrate de que esta línea está presente
