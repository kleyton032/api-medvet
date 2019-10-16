const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

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
        required:true,
        unique: true
    },
    telefones:{
        type:[{type: String}]
    },
    endereco:{
        type:{
            local:{type: String, required: true},
            numero:{type: String, required: true},
            complemento:{type: String},
            bairro:{type: String, required: true},
            cidade:{type: String, required: true},
            cep:{type: String, required: true},
        },
        required:true   
    }
},{timestamps: true})

const Veterinario = mongoose.model('Vet', VeterinarioSchema)
module.exports = Veterinario