const mongoose = require('mongoose');

// const { Schema, model } = require('mongoose');

let Schema = mongoose.Schema;

const ProductoSchema = new Schema({

    nombre:{
        type: String,
        required: [true, 'El nombre es necesario'],
        unique: true
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
    precio:{
        type: Number,
        required: [true, 'El apellido es necesario']
    }
});

ProductoSchema.methods.toJSON = function() {
    const { __v, estado, ...data  } = this.toObject();
    return data;
}

module.exports = mongoose.model('Producto', ProductoSchema);