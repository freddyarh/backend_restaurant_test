const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const BusinessGroupSchema = new Schema({

    name:{
        type: String,
        required: [true, 'El nombre es necesario'],
    },
    logo: {
        type: String 
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    color: {
        type: String,
        required: "The name is required",
    },
    companies: [
        {
            name: { type: String, required: "The name is required" },
            industry: { type: String, required: "The industry is required" },
            employees: { type: Number, required: "The employees is required" },
            communicationLevels: [
                {
                    name: { type: String, required: "The name is required" },
                    description: {
                    type: String,
                    required: "The description is required",
                    },
                },
            ],
        },
    ],
});

BusinessGroupSchema.methods.toJSON = function() {
    const { __v, estado, ...data  } = this.toObject();
    return data;
}

module.exports = mongoose.model('BusinessGroup', BusinessGroupSchema);