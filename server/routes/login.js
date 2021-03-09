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
        console.log(usuario);
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
                ok: false,
                err: {
                    message: 'Contraseña invalida'
                }
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
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }   

});

module.exports = app;



// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const Usuario = require('../models/usuario');


// const app = express();

// app.post('/login', (req, res) =>{

//     let body = req.body;

//     Usuario.findOne({email:body.email},(err, usuarioBD) => {
//         if(err){
//             return res.status(500).json({
//                 ok: false,
//                 err
//             });
//         }
//         if(!usuarioBD){
//             return res.status(400).json({
//                 ok: false,
//                 err: {
//                     message: 'No existe ese email'
//                 }
//             });
//         }
//         if(!bcrypt.compareSync(body.password, usuarioBD.password)){
//             return res.status(400).json({
//                 ok: false,
//                 err: {
//                     message: 'Contraseña invalida'
//                 }
//             });
//         }
//         // let expira = new Date();
//         // expira.setTime(1598040803 * 1000)
//         // 1598040803000
//         // expira.setTime(1598037203 * 1000)
//         // 1598037203000
//         // expira

//         let token = jwt.sign({
//             usuario: usuarioBD
//           }, 'este-es-el-token', { expiresIn: 60 * 60 * 24 * 30 });
        
//         res.json({
//             ok:true,
//             usuarioBD,
//             token

//         });

//     });

// });



// module.exports = app;
