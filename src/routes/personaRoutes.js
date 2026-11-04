const express = require('express');
const router = express.Router();

const personaController = require('../controllers/personaController');

router.get('/getPersonas', personaController.getPersonas);
router.get('/getPersonaById/:id', personaController.getPersonaById);
router.post('/postPersona', personaController.postPersona);
router.put('/putPersona/:id', personaController.putPersona);
router.delete('/deletePersona/:id', personaController.deletePersona);


module.exports = router;