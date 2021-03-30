const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const Categoria = require('../models/categoria');

const fs = require('fs');
const path = require('path');


// default options
app.use(fileUpload());

app.put('/uploads/:tipo/:id', function(req, res) {

    let tipo = req.params.tipo;
    let id = req.params.id;

    if (!req.files) /*|| Object.keys(req.files).length === 0)*/ {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se ha seleccionado ningun archivo'
            }
        });
    }

    //Validar tipo
    let tipoValidos = ['productos', 'usuarios', 'categorias'];

    if (tipoValidos.indexOf(tipo) < 0) {

        return res.status(400).json({
            ok: false,
            err: {
                message: 'Los tipos validos permitidas son ' + tipoValidos.join(', '),
                ext: tipo
            }

        })
    }


    // The name of the input field (i.e. "archivo") is used to retrieve the uploaded file
    let archivo = req.files.archivo;
    let nombreCortado = archivo.name.split('.');
    let [nombre, extension] = nombreCortado; //extension = nombreCortado[nombreCortado.length - 1];
    //console.log(extension);

    //Extenciones permitidas
    let extencionesPermitidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extencionesPermitidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Las extensiones permitidas son ' + extencionesPermitidas.join(', '),
                ext: extension
            }

        })
    }

    //Cambiar nombre al archivo
    let nombreArchivo = `${id}-${new Date().getMilliseconds() }.${extension}`;

    // Use the mv() method to place the file somewhere on your server
    archivo.mv(`uploads/${tipo}/${nombreArchivo}`, (err) => {
        
        if (err) {

            return res.status(500).json({
                ok: false,
                err
            });
        }

        //Aqui imagen cargada
        if (tipo === 'usuarios') {

            imagenUsuario(id, res, nombreArchivo);
        } else if (tipo === 'productos') {

            imagenProducto(id, res, nombreArchivo);
        } else {
            imagenCategoria(id, res, nombreArchivo);
        }

    });

});

app.get(`/uploads/:tipo/:id`, async(req, res) => {

    // let tipo = req.params.tipo;
    // let id = req.params.id;

    const {id, tipo} = req.params;
    let modelo;

    switch (tipo) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if( !modelo ){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
        break;

        case 'productos':
            modelo = await Producto.findById(id);
            if( !modelo ){
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
        break;
        case 'categorias':
            modelo = await Categoria.findById(id);
            if( !modelo ){
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
        break;

        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' });
    }

    // Limpiar imágenes previas
    if ( modelo.img ) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join( __dirname, '../../uploads', tipo, modelo.img );
        if ( fs.existsSync( pathImagen ) ) {
            return res.sendFile( pathImagen )
        }
    }

    const pathImagen = path.join( __dirname, '../../assets/no-image.jpg');
    res.sendFile( pathImagen );

});

function imagenUsuario(id, res, nombreArchivo) {
    Usuario.findById(id, (err, usuarioBD) => {
        // console.log(usuarioDB);
        if (err) {
            borrarArchvo(nombreArchivo, 'usuarios');

            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!usuarioBD) {
            borrarArchvo(nombreArchivo, 'usuarios');


            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Usuario no existe'
                }
            })
        }

        // let pathImagen = path.resolve(__dirname, `../../uploads/usuarios/${usuarioBD.img}`);


        // if (fs.existsSync(pathImagen)) {
        //     fs.unlinkSync(pathImagen);
        // }

        borrarArchvo(usuarioBD.img, 'usuarios');

        usuarioBD.img = nombreArchivo;
        usuarioBD.save((err, usuarioGuardado) => {
            res.json({
                ok: true,
                usuario: usuarioGuardado,
                img: nombreArchivo
            });
        });


    });
}

function imagenCategoria(id, res, nombreArchivo) {
    Categoria.findById(id, (err, categoriaDB) => {
        // console.log(usuarioDB);
        if (err) {
            borrarArchvo(nombreArchivo, 'categorias');

            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!categoriaDB) {
            borrarArchvo(nombreArchivo, 'categorias');


            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Categoria no existe'
                }
            })
        }

        // let pathImagen = path.resolve(__dirname, `../../uploads/categorias/${categoriaDB.img}`);


        // if (fs.existsSync(pathImagen)) {
        //     fs.unlinkSync(pathImagen);
        // }

        borrarArchvo(categoriaDB.img, 'categorias');

        categoriaDB.img = nombreArchivo;
        categoriaDB.save((err, categoriaGuardado) => {
            res.json({
                ok: true,
                categoria: categoriaGuardado,
                img: nombreArchivo
            });
        });


    });
}

function imagenProducto(id, res, nombreArchivo) {

    Producto.findById(id, (err, productoDB) => {
        if (err) {
            borrarArchvo(nombreArchivo, 'productos');

            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!productoDB) {
            borrarArchvo(nombreArchivo, 'productos');


            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Producto no existe'
                }
            })
        }

        // let pathImagen = path.resolve(__dirname, `../../uploads/usuarios/${productoDB.img}`);


        // if (fs.existsSync(pathImagen)) {
        //     fs.unlinkSync(pathImagen);
        // }

        borrarArchvo(productoDB.img, 'productos');

        productoDB.img = nombreArchivo;
        productoDB.save((err, productoGuardado) => {
            res.json({
                ok: true,
                producto: productoGuardado,
                img: nombreArchivo
            });
        });


    });



}

function borrarArchvo(nombreImagen, tipo) {

    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);


    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    }

}



module.exports = app;