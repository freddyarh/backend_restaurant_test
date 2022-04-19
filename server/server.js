const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cors = require('cors');

let app = express();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Configuración global de rutas
app.use(require('./routes/index'));

mongoose.connect('mongodb://localhost:27017/restaurante', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err, res) => {
    if (err) throw err;

    console.log('Base de datos online');
});


app.listen(3000, () => {
    console.log('Escuchando puerto 3000');
})

module.exports = app;