// const { Schema } = require("mongoose")

const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria'],
        // unique: false
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    img: {
        type: String,
        required: false
    }
});

CategoriaSchema.methods.toJson = function() {
    const { __v, estado, ...data } = this.toObject();
    return data;
}

module.exports = model( 'Categoria', CategoriaSchema );