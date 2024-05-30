//El bakestudiantes.js manejara el mapeo de la colección que usaremos.
const mongoose = require('mongoose')

const hogaresSchema = new mongoose.Schema({
    representante: String,
    nombre: String,
    habitantes: Number,
    direccion: String,
    colonia: String,
    referencia: String,
    numero: Number,
    salario: Number
});

const hogares = mongoose.model('hogares', hogaresSchema);

module.exports = hogares;