const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');


const app = express();

app.post('/login', (req, res) =>{

    let body = req.body;

    Usuario.findOne({email:body.email},(err, usuarioBD) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!usuarioBD){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No existe ese email'
                }
            });
        }
        if(!bcrypt.compareSync(body.password, usuarioBD.password)){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Contraseña invalida'
                }
            });
        }
        // let expira = new Date();
        // expira.setTime(1598040803 * 1000)
        // 1598040803000
        // expira.setTime(1598037203 * 1000)
        // 1598037203000
        // expira

        let token = jwt.sign({
            usuario: usuarioBD
          }, 'este-es-el-token', { expiresIn: 60 * 60 * 24 * 30 });
        
        res.json({
            ok:true,
            usuarioBD,
            token

        });

    });

});



module.exports = app;