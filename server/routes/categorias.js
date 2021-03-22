// const express = require('express');
const { Router } = require('express')
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { crearcategoria, obtenerCategorias, obtenerCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');
// let app = express();

const router = Router();

//Todas las categorias
router.get('/categorias', obtenerCategorias);

//Obtener una categoria por ID
router.get('/categoria/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoria);

//Crear categoria privada con un toquen 
router.post('/categoria', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearcategoria);

//actualizar categoria privada con un toquen 
router.put('/categoria/:id', async(req, res) => {

    res.json('actualizar');

});

//borrar una categoria admin
router.delete('/categoria/:id', async(req, res) => {

    res.json('delete');

});


module.exports = router;