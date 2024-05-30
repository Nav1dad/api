//Configuramos una pequeña interfaz de servidor en App.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbvivienda = require('./rutas/dbvivienda');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use('/lapi/dbvivienda' , dbvivienda);

// conectarse a la base de datos

mongoose.connect('mongodb://localhost:27017/dbvivienda')
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexion a MongoDB:'));
db.once('open', () => {
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
