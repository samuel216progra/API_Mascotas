const {Schema, model}  = require ('mongoose');

const AnimalSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del animal es de caracter obligatorio']
    },

    tipo: {
        type: String,
        required: [true, 'El tipo de animal es de caracter obligatorio']
    },
    
    raza: {
        type: String,
        required: [true, 'La raza de animal es de caracter obligatoria']
    },

    caracterizticas: {
        type: String, 
        required: [true, 'Caracterizticas visibles del animal']
    },
    
    estadoDelAnimal: {
        type: String,
        required: [true, 'El estado de animal es de caracter']
    },

    img: {
        type: String
    },

    role: {
        type: String,
        required: true,
        enum: ["ADOPTADO_ROLE", "SINADOPTAR_ROLE"]
    },

    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Animal', AnimalSchema);