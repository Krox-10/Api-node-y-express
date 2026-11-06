const { crearModelo } = require('../utils/crudFactory');

module.exports = crearModelo({
    tabla: 'servicios',
    id: 'id_servicio',
    columnas: ["nombre", "descripcion", "tarifa_mensual", "estado"]
});
