const personaModel = require('../models/personaModel');
// se realiza llamado al modelo

module.exports = {
    getPersonas: (req, res) => {
        personaModel.getPersonas((err, result) =>{
            if (err){
                res.status(500).json({error: err.message});
                return;       }

            res.status(200).json({data: result});
        });
    },

    getPersonaById: (req, res) => {
        const {id} = req.params;
        personaModel.getPersonaById(id, (err, result) => {
            if (err){
                res.status(500).json({error: err.message});
                return;
            }

            if (result.length === 0){
                res.status(404).json({message: 'Persona no encontrada'});
                return;
            }
            res.status(200).json({data: result});
        });
    },


    postPersona: (req, res) =>{
        const {nombre, apellido, cedula, edad, celular} = req.body;

        personaModel.postPersona(nombre, apellido, cedula, edad, celular, (err,           result) =>{
            if (err){
                res.status(500).json({error: err.message});
                return;
            }
            res.status(201).json({message: 'Persona creada exitosamente', data: {idInsertado: result}});
        });
    },

    putPersona: (req, res) => {
        const {id} = req.params;
        const {nombre, apellido, cedula, edad, celular} = req.body;
        personaModel.putPersona(id, nombre, apellido, cedula, edad, celular, (err,         result) =>{
            if (err){
                res.status(500).json({error: err.message});
                return;
            }
            if(result.affectedRows === 0){
                res.status(404).json({message: 'Persona no encontrada'});
                return;
            }
            res.status(200).json({message: 'Persona actualizada exitosamente'});
        });
    },


    deletePersona: (req, res) => {
        const {id} = req.params;

    personaModel.deletePersona(id, (err, result) => {
        if (err){
            res.status(500).json({error: err.message});
            return;
        }
        if(result.affectedRows === 0){
            res.status(404).json({message: 'Persona no encontrada'});
            return;
        }
        res.status(200).json({message: 'Persona eliminada exitosamente'});
        });
    }




}