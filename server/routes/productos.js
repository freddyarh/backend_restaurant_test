const { Router } = require('express')
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    obtenerProductosCategoria
} = require('../controllers/productos');


const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');

const router = Router();

// Obtener todos los productos

router.get('/productos', obtenerProductos);

// Obtener un producto por id - publico
router.get('/producto/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
], obtenerProducto);

// Crear producto - privado - cualquier persona con un token válido
router.post('/producto', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], crearProducto);

//recolectar categorias con sus respectivos productos
router.get('/categoria/productos/:id', obtenerProductosCategoria);

module.exports = router;