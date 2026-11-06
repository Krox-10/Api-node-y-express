const express = require('express');
const router = express.Router();
const controlador = require('../controllers/puestoController');

router.get('/getPuestos', controlador.obtenerTodos);
router.get('/getPuestoById/:id', controlador.obtenerPorId);
router.post('/postPuesto', controlador.crear);
router.put('/putPuesto/:id', controlador.actualizar);
router.delete('/deletePuesto/:id', controlador.eliminar);

module.exports = router;
