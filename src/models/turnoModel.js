const { crearModelo } = require('../utils/crudFactory');

module.exports = crearModelo({
    tabla: 'turnos',
    id: 'id_turno',
    columnas: ["id_guardia", "id_puesto", "fecha", "hora_inicio", "hora_fin", "estado"]
});
