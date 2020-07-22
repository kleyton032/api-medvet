const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
Schema = mongoose.Schema;
const UnidadeSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, "não pode ficar vazio."],
    },
    cnpj: {
        type: String,
        required: [true, "não pode ficar vazio."],
        unique: true
    },
    telefones: {
        type: [{ type: String }],
        required: [true, "não pode ficar vazio."],
    },
    endereco: {
        type: {
            local: { type: String, required: true },
            numero: { type: String, required: true },
            complemento: { type: String },
            bairro: { type: String, required: true },
            cidade: { type: String, required: true },
            CEP: { type: String, required: true },
        },
        required: true
    },
    titular: {
        type: {
            nome: { type: String, required: true },
            cpf: { type: String, required: true, unique: true },
            telefones: [{ type: String }],
            endereco: {
                type: {
                    local: { type: String, required: true },
                    numero: { type: String, required: true },
                    complemento: { type: String },
                    bairro: { type: String, required: true },
                    cidade: { type: String, required: true },
                    CEP: { type: String, required: true },
                },
                required: true
            }
        },
        required: true
    },

}, { timestamps: true });

UnidadeSchema.plugin(uniqueValidator, { message: "{PATH} Já está sendo utilizado" });
module.exports = mongoose.model("Unidade", UnidadeSchema)