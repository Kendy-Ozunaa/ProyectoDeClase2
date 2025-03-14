const express = require('express');
const router = express.Router();
const empleadosController = require('../controllers/empleadosController');

// Obtener todos los empleados
router.get('/', (req, res) => {
    const empleados = empleadosController.getEmpleados();
    res.json(empleados);
});

// Crear un nuevo empleado
router.post('/', (req, res) => {
    const empleados = empleadosController.getEmpleados();
    const nuevoEmpleado = {
        id: Date.now(),
        nombre: req.body.nombre,
        cedula: req.body.cedula,
        tanda_labor: req.body.tanda_labor,
        porciento_comision: req.body.porciento_comision,
        fecha_ingreso: req.body.fecha_ingreso,
        estado: req.body.estado
    };
    empleados.push(nuevoEmpleado);
    empleadosController.saveEmpleados(empleados);
    res.status(201).json(nuevoEmpleado);
});

// Actualizar un empleado
router.put('/:id', (req, res) => {
    const empleados = empleadosController.getEmpleados();
    const empleadoIndex = empleados.findIndex(e => e.id === parseInt(req.params.id));
    if (empleadoIndex === -1) {
        return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    empleados[empleadoIndex] = {
        ...empleados[empleadoIndex],
        ...req.body
    };
    empleadosController.saveEmpleados(empleados);
    res.json(empleados[empleadoIndex]);
});

// Eliminar un empleado
router.delete('/:id', (req, res) => {
    const empleados = empleadosController.getEmpleados();
    const empleadoIndex = empleados.findIndex(e => e.id === parseInt(req.params.id));
    if (empleadoIndex === -1) {
        return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    empleados.splice(empleadoIndex, 1);
    empleadosController.saveEmpleados(empleados);
    res.status(204).send();
});

module.exports = router;