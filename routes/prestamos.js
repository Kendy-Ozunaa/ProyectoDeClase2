const express = require("express");
const router = express.Router();
const prestamosController = require("../controllers/prestamosController");

// Rutas del CRUD combinado de Préstamos y Devoluciones
router.get("/", prestamosController.obtenerPrestamos); // Obtener todos
router.post("/", prestamosController.agregarPrestamo); // Crear préstamo
router.put("/devolver/:id", prestamosController.registrarDevolucion); // Registrar devolución
router.get("/buscar", prestamosController.filtrarPrestamos); // Búsqueda por criterios

module.exports = router;
