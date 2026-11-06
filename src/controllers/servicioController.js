const modelo = require('../models/servicioModel');
const { crearControlador } = require('../utils/crudFactory');

module.exports = crearControlador(modelo, {
    campos: ["nombre", "descripcion", "tarifa_mensual", "estado"],
    requeridos: ["nombre"]
});
