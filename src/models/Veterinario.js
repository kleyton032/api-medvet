const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret
Schema = mongoose.Schema;

const VeterinarioSchema = Schema({
    nome: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    dataNascimento: {
        type: String,
        required: true
    },
    crmv: {
        type: Number,
        required: true,
        unique: true
    },
    ufcrmv: {
        type: String,
        required: true,
    },
    especialidades: [{
        type: Schema.Types.ObjectId,
        ref: "Especialidade",
        required: [true,"não pode ficar vazio."]
    }],
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
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "não pode ficar vazio."],
        index: true,
        match: [/\S+@\S+\.\S+/, 'é inválido.']
    },
    permissao: {
        type: Array,
        default: ["veterinario"]
    },
    hash: { type: String },
    salt: { type: String },
    recovery: {
        type: {
            token: String,
            date: Date
        },
        default: {}
    }
}, { timestamps: true })

VeterinarioSchema.plugin(uniqueValidator, { message: "Já está sendo utilizado" })

VeterinarioSchema.methods.setSenha = function (password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 512, "sha512").toString("hex");
}

VeterinarioSchema.methods.validarSenha = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 512, "sha512").toString("hex");
    return hash === this.hash
}

VeterinarioSchema.methods.gerarToken = function () {
    const hoje = new Date();
    const exp = new Date(hoje);
    exp.setDate(hoje.getDate() + 15)

    return jwt.sign({
        id: this._id,
        email: this.email,
        nome: this.nome,
        exp:parseFloat(exp.getTime() /1000, 10)
    }, secret);
}

VeterinarioSchema.methods.enviarAuthJson = function(){
    return{
        _id: this._id,
        nome: this.nome,
        email: this.email,
        role: this.permissao,
        token:this.gerarToken()
    }
}

module.exports = mongoose.model('Veterinario', VeterinarioSchema)