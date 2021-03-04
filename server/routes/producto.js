
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
app.post('/producto', async(req, res) => {
    
    // let body = req.body;

    // // console.log(body.nombre);

    // let producto = new Producto({
    //     nombre: body.nombre,
    //     usuario: 
    //     precio: body.precio,
    // });

    // producto.save((err, productoBD) => {
    //     if(err){
    //         return res.status(400).json({
    //             ok:false,
    //             err
    //         });
    //     }

    //     res.json({
    //         ok:true,
    //         producto: productoBD
    //     });
    // });

    const { estado, usuario, ...body } = req.body;

    const productoDB = await Producto.findOne({ nombre: body.nombre });

    if ( productoDB ) {
        return res.status(400).json({
            msg: `El producto ${ productoDB.nombre }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto( data );

    // Guardar DB
    await producto.save();

    res.status(201).json(producto);

 });

 module.exports = app;