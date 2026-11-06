const modelo = require('../models/puestoModel');
const { crearControlador } = require('../utils/crudFactory');

module.exports = crearControlador(modelo, {
    campos: ["id_persona", "id_servicio", "nombre", "direccion", "descripcion", "estado"],
    requeridos: ["id_persona", "nombre"]
});
