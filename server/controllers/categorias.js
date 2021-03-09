const { response } = require('express');
const { Categoria } = require('../models');

const crearcategoria = async(req, res = response) => {
    
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if( categoriaDB ){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        });
    }

    //Generar la data a guardar la categoria
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    console.log(data);

    const categoria = new Categoria(data);

    //Guardar Categoria
    await categoria.save();

    res.status(201).json(categoria);

}

module.exports = {
    crearcategoria
}