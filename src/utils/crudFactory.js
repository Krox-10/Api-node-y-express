const db = require('../config/dbConfig');

function crearModelo({ tabla, id, columnas }) {
    const columnasSQL = columnas.join(', ');

    return {
        obtenerTodos(callback) {
            db.query(`SELECT ${id}, ${columnasSQL} FROM ${tabla}`, callback);
        },

        obtenerPorId(valorId, callback) {
            db.query(
                `SELECT ${id}, ${columnasSQL} FROM ${tabla} WHERE ${id} = ?`,
                [valorId],
                callback
            );
        },

        crear(datos, callback) {
            const campos = Object.keys(datos);
            const valores = campos.map(campo => datos[campo]);
            const placeholders = campos.map(() => '?').join(', ');

            const sql = `INSERT INTO ${tabla} (${campos.join(', ')}) VALUES (${placeholders})`;
            db.query(sql, valores, (err, resultado) => {
                if (err) return callback(err);
                callback(null, resultado.insertId);
            });
        },

        actualizar(valorId, datos, callback) {
            const campos = Object.keys(datos);
            const asignaciones = campos.map(campo => `${campo} = ?`).join(', ');
            const valores = campos.map(campo => datos[campo]);
            valores.push(valorId);

            const sql = `UPDATE ${tabla} SET ${asignaciones} WHERE ${id} = ?`;
            db.query(sql, valores, callback);
        },

        eliminar(valorId, callback) {
            db.query(`DELETE FROM ${tabla} WHERE ${id} = ?`, [valorId], callback);
        }
    };
}

function crearControlador(modelo, { campos, requeridos }) {
    function filtrarDatos(body) {
        const datos = {};
        for (const campo of campos) {
            if (Object.prototype.hasOwnProperty.call(body, campo)) {
                datos[campo] = body[campo];
            }
        }
        return datos;
    }

    function validarDatos(datos, exigirRequeridos = true) {
        if (Object.keys(datos).length === 0) {
            return 'Debes enviar al menos un campo en el cuerpo JSON';
        }

        if (exigirRequeridos) {
            for (const campo of requeridos) {
                if (
                    datos[campo] === undefined ||
                    datos[campo] === null ||
                    String(datos[campo]).trim() === ''
                ) {
                    return `El campo "${campo}" es obligatorio`;
                }
            }
        }

        return null;
    }

    function responderError(res, err) {
        console.error(err);

        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                mensaje: 'Ya existe un registro con un dato único, como documento o correo',
                detalle: err.sqlMessage
            });
        }

        if (
            err.code === 'ER_ROW_IS_REFERENCED_2' ||
            err.code === 'ER_NO_REFERENCED_ROW_2'
        ) {
            return res.status(409).json({
                mensaje: 'No se puede completar la operación porque existe un problema con una relación entre tablas',
                detalle: err.sqlMessage
            });
        }

        return res.status(500).json({
            mensaje: 'Error al consultar la base de datos',
            detalle: err.sqlMessage || err.message
        });
    }

    return {
        obtenerTodos(req, res) {
            modelo.obtenerTodos((err, resultado) => {
                if (err) return responderError(res, err);
                res.status(200).json({ data: resultado });
            });
        },

        obtenerPorId(req, res) {
            const id = Number(req.params.id);
            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({ mensaje: 'El ID debe ser un número entero positivo' });
            }

            modelo.obtenerPorId(id, (err, resultado) => {
                if (err) return responderError(res, err);
                if (resultado.length === 0) {
                    return res.status(404).json({ mensaje: 'Registro no encontrado' });
                }
                res.status(200).json({ data: resultado[0] });
            });
        },

        crear(req, res) {
            const datos = filtrarDatos(req.body || {});
            const errorValidacion = validarDatos(datos, true);
            if (errorValidacion) {
                return res.status(400).json({ mensaje: errorValidacion });
            }

            modelo.crear(datos, (err, idInsertado) => {
                if (err) return responderError(res, err);
                res.status(201).json({
                    mensaje: 'Registro creado exitosamente',
                    idInsertado
                });
            });
        },

        actualizar(req, res) {
            const id = Number(req.params.id);
            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({ mensaje: 'El ID debe ser un número entero positivo' });
            }

            const datos = filtrarDatos(req.body || {});
            const errorValidacion = validarDatos(datos, false);
            if (errorValidacion) {
                return res.status(400).json({ mensaje: errorValidacion });
            }

            modelo.actualizar(id, datos, (err, resultado) => {
                if (err) return responderError(res, err);
                if (resultado.affectedRows === 0) {
                    return res.status(404).json({ mensaje: 'Registro no encontrado' });
                }
                res.status(200).json({ mensaje: 'Registro actualizado exitosamente' });
            });
        },

        eliminar(req, res) {
            const id = Number(req.params.id);
            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({ mensaje: 'El ID debe ser un número entero positivo' });
            }

            modelo.eliminar(id, (err, resultado) => {
                if (err) return responderError(res, err);
                if (resultado.affectedRows === 0) {
                    return res.status(404).json({ mensaje: 'Registro no encontrado' });
                }
                res.status(200).json({ mensaje: 'Registro eliminado exitosamente' });
            });
        }
    };
}

module.exports = { crearModelo, crearControlador };
