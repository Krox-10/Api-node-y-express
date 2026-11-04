const db = require('../config/dbConfig');
const { post } = require('../routes/personaRoutes');
// se llama a la config de la bd

class persona{
    getPersonas(callback){
        const sql = "Select id, nombre, apellido, cedula, edad, celular from persona";
        db.query(sql, callback);
    }
    
    getPersonaById(id, callback){
        const sql = "Select id, nombre, apellido, cedula, edad, celular from persona WHERE id = ?";
        db.query(sql, [id], callback);
    }
    
    
    postPersona(nombre, apellido, cedula, edad, celular, callback){
    const sql = "INSERT INTO persona (nombre, apellido, cedula, edad, celular) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [nombre, apellido, cedula, edad, celular], (err, result)=>{
        if(err){
            return callback(err, null);
        }
        callback(null, result.insertId);
    });
}



    putPersona(id, nombre, apellido, cedula, edad, celular, callback){
        const sql = "UPDATE persona SET nombre = ?, apellido = ?, cedula = ?, edad = ?, celular = ? WHERE id = ?";
        db.query(sql, [nombre, apellido, cedula, edad, celular, id], callback);
    
    }


    deletePersona(id, callback){
        const sql = "DELETE FROM persona WHERE id = ?";
        db.query(sql, [id], callback);
    }

    







}//fin

module.exports = new persona();

