const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret

const UsuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true,"não pode ficar vazio."]
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true,"não pode ficar vazio."],
        index: true,
        match: [/\S+@\S+\.\S+/, 'é inválido.']
    },
    permissao: {
        type: Array,
        default: ["atendente"]
    },
    /** 
    veterinario:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Veterinario",
    
    },
    funcionario:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Funcionario",
    },
    */
    hash: { type: String },
    salt: { type: String },
    recovery: {
        type: {
            token: String,
            date: Date
        },
        default: {}
    }
},{ timestamps: true });

UsuarioSchema.plugin(uniqueValidator, { message: "Já está sendo utilizado" })   

UsuarioSchema.methods.setSenha = function (password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 512, "sha512").toString("hex");
}

UsuarioSchema.methods.validarSenha = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 512, "sha512").toString("hex");
    return hash === this.hash
}

UsuarioSchema.methods.gerarToken = function () {
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

UsuarioSchema.methods.enviarAuthJson = function(){
    return{
        _id: this._id,
        nome: this.nome,
        email: this.email,
        role: this.permissao,
        token:this.gerarToken(),
        //veterinario: this.veterinario,
        //funcionario: this.funcionario
    }
}

module.exports = mongoose.model('Usuario', UsuarioSchema)


