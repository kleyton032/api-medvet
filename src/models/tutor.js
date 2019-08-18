const mongoose = require('../config/database');

const TutorSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    cpf:{
        type:String,
        unique:true,
        required:true
    },
    telefones: [{
        type: String,
        required: true
    }],
    endereco: [{
        logradouro:{
            type:String,
            required: true
        },
        numero:{
            type: String,
            required: true
        },
        complemento:{
            type:String,
        },
        bairro:{
            type:String,
            required: true
        },
        cidade:{
            type:String,
            required: true
        },
        estado:{
            type:String,
            required: true
        },
        cep:{
            type:String,
            required: true
        }
    }],
    dataNascimento:{
        type:String,
        required:true
    },
    email:{
        type: String,
        unique: true,
        lowercase: true

    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

const Tutor = mongoose.model('Tutor', TutorSchema)
module.exports = Tutor