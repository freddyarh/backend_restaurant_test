
const express = require('express');

// const { verificaToken } = require('../middlewares/autenticacion');


let app = express();
let Producto = require('../models/producto');


app.get('/producto', function (req, res) {
    res.status(200).json({
        ok:true,
        message:'Se pudo ejecutar'
    });
  })
app.post('/producto', function (req, res) {
    let body = req.body;

    // console.log(body.nombre);

    let producto = new Producto({
        nombre: body.nombre,
        precio: body.precio
    });

    producto.save((err, productoBD) => {
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            producto: productoBD
        });
    });

 });

 module.exports = app;