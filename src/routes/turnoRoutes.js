const express = require('express');
const router = express.Router();
const controlador = require('../controllers/turnoController');

router.get('/getTurnos', controlador.obtenerTodos);
router.get('/getTurnoById/:id', controlador.obtenerPorId);
router.post('/postTurno', controlador.crear);
router.put('/putTurno/:id', controlador.actualizar);
router.delete('/deleteTurno/:id', controlador.eliminar);

module.exports = router;
