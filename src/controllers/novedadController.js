const modelo = require('../models/novedadModel');
const { crearControlador } = require('../utils/crudFactory');

module.exports = crearControlador(modelo, {
    campos: ["id_turno", "tipo", "descripcion", "fecha_hora", "nivel"],
    requeridos: ["id_turno", "tipo", "fecha_hora"]
});
