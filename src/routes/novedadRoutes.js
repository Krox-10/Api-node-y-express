const express = require('express');
const router = express.Router();
const controlador = require('../controllers/novedadController');

router.get('/getNovedades', controlador.obtenerTodos);
router.get('/getNovedadById/:id', controlador.obtenerPorId);
router.post('/postNovedad', controlador.crear);
router.put('/putNovedad/:id', controlador.actualizar);
router.delete('/deleteNovedad/:id', controlador.eliminar);

module.exports = router;
