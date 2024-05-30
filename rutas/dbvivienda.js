//El archivo de rutas hogares.js manejara las solicitudes de api.

const express = require('express');
const ruta = express.Router();
const Vivienda = require('../modelos/hogares')

ruta.get('/', async (req, res) =>{
    try {
        const hogares = await Vivienda.find();
        res.json(hogares);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

ruta.post('/', async (req, res) => {
    const vivienda = new Vivienda({
        representante: req.body.representante,
        nombre: req.body.nombre,
        habitantes: req.body.habitantes,
        direccion: req.body.direccion,
        colonia: req.body.colonia,
        telefono: req.body.telefono,
        referencia: req.body.referencia,
        numero: req.body.numero,
        salario: req.body.salario
    });

    try {
        const nuevaVivienda = await vivienda.save();
        res.status(201).json(nuevaVivienda);
    } catch (err){
        res.status(400).json({ message: err.message});
    }
});

ruta.get('/:id', getVivienda, (req, res) => {
    res.json(res.vivienda);
})

async function getVivienda(req, res, next){
    let vivienda;
    try{
        vivienda = await Vivienda.findById(req.params.id);
        if (vivienda == null){
            return res.status(404).json({ message: 'Vivienda no encontrado'});
        }
    }   catch (err) {
        return res.status(500).json({ message: err.message});
    }

    res.vivienda = vivienda;
    next();
}

ruta.put('/:id',
getVivienda, async (req, res) => {
    if (req.body.representante != null) {
        res.vivienda.representante = req.body.representante;
    }
    if (req.body.nombre != null) {
        res.vivienda.nombre = req.body.nombre;
    }
    if (req.body.habitantes != null) {
        res.vivienda.habitantes = req.body.habitantes;
    }
    if (req.body.direccion != null) {
        res.vivienda.direccion = req.body.direccion;
    }
    if (req.body.colonia != null) {
        res.vivienda.colonia = req.body.colonia;
    }
    if (req.body.referencia != null) {
        res.vivienda.referencia = req.body.referencia;
    }
    if (req.body.numero != null) {
        res.vivienda.numero = req.body.numero;
    }
    if (req.body.salario != null) {
        res.vivienda.salario = req.body.salario;
    }
    try {
        const viviendaActualizada = await res.vivienda.save();
        res.json(viviendaActualizada);
    }   catch (err) {
        res.status(400).json({ message: err.message});
    }
});

ruta.delete('/:id', getVivienda, async (req, res) => {
    try {
        await res.vivienda.deleteOne();
        res.json({ message: 'Vivienda eliminada' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = ruta;
