const { Router } = require('express')
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { createBusinessGroup, 
        getBussinesGroupById, 
        getAllBussinesGroup, 
        updateBusinessGroupById 
    } = require('../controllers/businessGroup');

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
router.post('/businessGroup', [
], createBusinessGroup);

//Get BusinessGroup by id
router.get('/getBussinesGroupById/:id', [
], getBussinesGroupById);

//Get all the BusinessGroup 
router.get('/getAllBussinesGroup', [
], getAllBussinesGroup);

// Update BusinessGroup By Id
router.put('/updateBusinessGroupById/:id', [
], updateBusinessGroupById);

module.exports = router;