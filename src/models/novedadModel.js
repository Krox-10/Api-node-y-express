const { crearModelo } = require('../utils/crudFactory');

module.exports = crearModelo({
    tabla: 'novedades',
    id: 'id_novedad',
    columnas: ["id_turno", "tipo", "descripcion", "fecha_hora", "nivel"]
});
