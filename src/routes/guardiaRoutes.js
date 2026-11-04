const express = require('express');
const router = express.Router();
const controlador = require('../controllers/guardiaController');

router.get('/getGuardias', controlador.obtenerTodos);
router.get('/getGuardiaById/:id', controlador.obtenerPorId);
router.post('/postGuardia', controlador.crear);
router.put('/putGuardia/:id', controlador.actualizar);
router.delete('/deleteGuardia/:id', controlador.eliminar);

module.exports = router;
