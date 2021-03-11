const { Usuario, Categoria } = require('../models')

/** Validadores de categoria */

const existeCategoriaPorId = async( id ) => {

    const existeCategoria = await Categoria.findById( id );

    if( !existeCategoria ) {
        throw new Error(`EL id no existe ${ id }`);
    }

}

module.exports = {
    existeCategoriaPorId
}