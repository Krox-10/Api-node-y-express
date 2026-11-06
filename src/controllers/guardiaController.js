const modelo = require('../models/guardiaModel');
const { crearControlador } = require('../utils/crudFactory');

module.exports = crearControlador(modelo, {
    campos: ["nombres", "apellidos", "documento", "telefono", "correo", "estado"],
    requeridos: ["nombres", "apellidos", "documento"]
});
