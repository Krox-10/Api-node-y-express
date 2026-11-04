const { crearModelo } = require('../utils/crudFactory');

module.exports = crearModelo({
    tabla: 'guardias',
    id: 'id_guardia',
    columnas: ["nombres", "apellidos", "documento", "telefono", "correo", "estado"]
});
