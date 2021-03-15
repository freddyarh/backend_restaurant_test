const { Usuario, Producto, Categoria } = require('../models')

/** Validadores de categoria */

const existeCategoriaPorId = async( id ) => {

    const existeCategoria = await Categoria.findById( id );

    if( !existeCategoria ) {
        throw new Error(`EL id no existe ${ id }`);
    }

}

/**
 * Productos
 */
const existeProductoPorId = async( id ) => {

    // Verificar si el correo existe
    const existeProducto = await Producto.findById(id);
    if ( !existeProducto ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

module.exports = {
    existeCategoriaPorId,
    existeProductoPorId
}