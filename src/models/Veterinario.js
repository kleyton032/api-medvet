const mongoose = require('../config/database');

const VeterinarioSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    cpf:{
        type:String,
        required: true,
        unique: true
    },
    dataNascimento:{
        type:String,
        required: true
    },
    crmv:{
        type: Number,
        required:true
    },
    telefone:{
        type: Number,
        required:true
    },
    logradouro:{
        type: String,
        required: true
    },
    numero:{
        type:String,
        required: true,
    },
    complemento:{
        type:String
    },
    bairro:{
        type: String,
        required:true
    },
    cep:{
        type: String,
        required:true
    },
    cidade:{
        type: String,
        required: true
    },
    estado:{
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

const Veterinario = mongoose.model('Vet', VeterinarioSchema)
module.exports = Veterinario