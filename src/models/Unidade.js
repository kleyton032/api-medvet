const mongoose = require('mongoose');
Schema = mongoose.Schema;
const UnidadeSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, "não pode ficar vazio."],
    },
    cnpj: {
        type: String,
        required: [true, "não pode ficar vazio."],
    },
    telefones: [{
        type: String,
        required: [true, "não pode ficar vazio."],
    }],
    endereco: [{
        logradouro: {
            type: String,
            required: true
        },
        numero: {
            type: String,
            required: true
        },
        complemento: {
            type: String,
        },
        bairro: {
            type: String,
            required: true
        },
        cidade: {
            type: String,
            required: true
        },
        estado: {
            type: String,
            required: true
        },
        cep: {
            type: String,
            required: true
        }
    }],
    titular: [{
        nome: {
            type: String,
            required: [true, "não pode ficar vazio."],
        },
        cpf: {
            type: String,
            required: [true, "não pode ficar vazio."],
        },
        telefones: [{
            type: String,
            required: [true, "não pode ficar vazio."],
        }],
        endereco: [{
            logradouro: {
                type: String,
                required: true
            },
            numero: {
                type: String,
                required: true
            },
            complemento: {
                type: String,
            },
            bairro: {
                type: String,
                required: true
            },
            cidade: {
                type: String,
                required: true
            },
            estado: {
                type: String,
                required: true
            },
            cep: {
                type: String,
                required: true
            }
        }],
    }],
}, { timestamps: true });


module.exports = mongoose.model("Unidade", UnidadeSchema)