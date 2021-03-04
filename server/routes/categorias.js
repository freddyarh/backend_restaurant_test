const express = require('express');

let app = express();

//Todas las categorias
app.get('/categoria', async(req, res) => {

    res.json('Todo ok');

});

//Obtener una categoria por ID
app.get('/categoria/:id', async(req, res) => {

    res.json('get-id');

});

//Crear categoria privada con un toquen 
app.post('/categoria', async(req, res) => {

    res.json('post');

});

//actualizar categoria privada con un toquen 
app.put('/categoria/:id', async(req, res) => {

    res.json('actualizar');

});

//borrar una categoria admin
app.delete('/categoria/:id', async(req, res) => {

    res.json('delete');

});


module.exports = app;