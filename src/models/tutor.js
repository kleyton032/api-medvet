
const mongoose = require('mongoose');
Schema = mongoose.Schema;

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
    telefones: {
        type: [{type:String}]
    },
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
        type:String
    },
    email:{
        type: String,
        unique: true,
        lowercase: true

    }
},{timestamps: true});

module.exports = mongoose.model("Tutor", TutorSchema)
