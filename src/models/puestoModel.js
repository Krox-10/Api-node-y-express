const { crearModelo } = require('../utils/crudFactory');

module.exports = crearModelo({
    tabla: 'puestos',
    id: 'id_puesto',
    columnas: ["id_persona", "id_servicio", "nombre", "direccion", "descripcion", "estado"]
});
