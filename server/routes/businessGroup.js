const { Router } = require('express')
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// const {
//     crearProducto,
//     obtenerProductos,
//     obtenerProducto,
//     obtenerProductosCategoria
// } = require('../controllers/productos');

const { createBusinessGroup } = require('../controllers/businessGroup');


// const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');

const router = Router();

// Obtener todos los productos

// Obtener un producto por id - publico

// Crear producto - privado - cualquier persona con un token válido

// router.post('/businessGroup', [
//     validarJWT,
//     check('nombre', 'El nombre es obligatorio').not().isEmpty(),
//     check('categoria', 'No es un id de Mongo').isMongoId(),
//     check('categoria').custom(existeCategoriaPorId),
//     validarCampos
// ], crearProducto);
router.post('/businessGroup/:id', [
    // check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    // check('categoria', 'No es un id de Mongo').isMongoId(),
    // check('categoria').custom(existeCategoriaPorId),
    // validarCampos
], createBusinessGroup);

//recolectar categorias con sus respectivos productos
// router.get('/categoria/productos/:id', obtenerProductosCategoria);

module.exports = router;