const express = require('express');
const { response } = require('express');
// const bcryptjs = require('bcryptjs')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generar-jwt');
// const { googleVerify } = require('../helpers/google-verify');
const app = express();

app.post('/login', async(req, res = response) =>{

    const { email, password } = req.body;
    console.log(req.body);

    try {
      
        // Verificar si el email existe
        const usuario = await Usuario.findOne({ email });

        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        // SI el usuario está activo
        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        // Verificar la contraseña
        if(!bcrypt.compareSync(password, usuario.password)){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        // const validPassword = bcrypt.compareSync( password, usuario.password );
        // if ( !validPassword ) {
        //     return res.status(400).json({
        //         msg: 'Usuario / Password no son correctos - password'
        //     });
        // }

        // Generar el JWT
        let token = jwt.sign({
            usuario
            }, 'este-es-el-token', { expiresIn: 60 * 60 * 24 * 30 });

        res.json({
            usuario,
            token
        })

    } catch (error) {
        // console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }   

});

module.exports = app;

