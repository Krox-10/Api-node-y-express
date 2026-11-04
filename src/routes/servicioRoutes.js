const express = require('express');
const router = express.Router();
const controlador = require('../controllers/servicioController');

router.get('/getServicios', controlador.obtenerTodos);
router.get('/getServicioById/:id', controlador.obtenerPorId);
router.post('/postServicio', controlador.crear);
router.put('/putServicio/:id', controlador.actualizar);
router.delete('/deleteServicio/:id', controlador.eliminar);

module.exports = router;
