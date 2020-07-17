const mongoose = require('mongoose')
Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const FuncionarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    dataNascimento:{
        type: String,
        required: true
    },
    funcao: {
        type: [{ type: String }],
        required: true
    },
    telefones: {
        type: [{ type: String }]
    },
    endereco: {
        type: {
            local: { type: String, required: true },
            numero: { type: String, required: true },
            complemento: { type: String },
            bairro: { type: String, required: true },
            cidade: { type: String, required: true },
            cep: { type: String, required: true },
        },
        required: true
    },
}, { timestamps: true })

FuncionarioSchema.plugin(uniqueValidator, { message: "CPF Já está sendo utilizado" })


module.exports = mongoose.model('Funcionario', FuncionarioSchema)
