const modelo = require('../models/turnoModel');
const { crearControlador } = require('../utils/crudFactory');

module.exports = crearControlador(modelo, {
    campos: ["id_guardia", "id_puesto", "fecha", "hora_inicio", "hora_fin", "estado"],
    requeridos: ["id_guardia", "id_puesto", "fecha", "hora_inicio", "hora_fin"]
});
