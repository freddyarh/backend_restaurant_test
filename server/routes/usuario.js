const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');
const { verificaToken } = require('../middlewares/autenticacion');
//const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

const app = express();


app.get('/usuario', /*verificaToken,*/ (req, res) => {


    let desde = req.query.desde || 0;
    desde = Number(desde);

    // /usuario?desde=0&limite=5

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email role estado google img')
        // .skip(desde)
        // .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    counter: conteo
                });

            });

        });

});

app.get('/usuario/:id',( req, res ) => {

    let id = req.params.id;
    console.log(id);

    Usuario.findById(id,(err, usuario) => {

        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.json({
            ok: true,
            usuario
        });
    });

});

app.post('/usuario', /*[verificaToken, verificaAdmin_Role],*/ function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });


    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });


});

app.put('/usuario/:id', (req, res) => {

    let body = req.body;
    let id = req.params.id;

    Usuario.findByIdAndUpdate(id, body, {new:true}, (err, usuarioDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!usuarioDB){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuarioDB
        });

    });

});

module.exports = app;