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
        index: true,
        match: [/\S+@\S+\.\S+/, 'é inválido.']
    },
    cpf:{
        type: String,
        required: [true,"não pode ficar vazio."],
        unique: true,
    },
    telefones:{
        type: [{ type: String }],
        required: [true,"não pode ficar vazio."]
    },
    endereco:{
        type: {
            local: { type: String },
            numero: { type: String },
            complemento: { type: String },
            bairro: { type: String},
            cidade: { type: String },
            CEP: { type: String},
        },
    },
    dataNascimento:{
        type: String,
        required: [true,"não pode ficar vazio."]
    },
    funcao:{
        type: String,
        required: [true,"não pode ficar vazio."]
    },
    crmv: {
        type: Number,
        unique: true
    },
    ufcrmv: {
        type: String,
    },
    permissao: {
        type: Array,
        default: ["atendente"]
    },
    unidade:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Unidade',
        required: [true,"não pode ficar vazio."],
    },
    genero:{
        type: String,
        required: [true,"não pode ficar vazio."]
    },
    hash: { type: String, select: false },
    salt: { type: String , select: false},
    recovery: {
        type: {
            token: String,
            date: Date
        },
        default: {},
        select: false
    }, 
    status:{
        type: String,
        default: "ativo"
    }
},{ timestamps: true });

UsuarioSchema.plugin(uniqueValidator, { message: "{PATH} Já está sendo utilizado" })   

UsuarioSchema.methods.setSenha = function (password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 100, "sha512").toString("hex");
}

UsuarioSchema.methods.validarSenha = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 100, "sha512").toString("hex");
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

UsuarioSchema.methods.getUserId = function(){
    return{
        _id: this._id,
        nome: this.nome,
        email: this.email,
        cpf: this.cpf,
        dataNascimento: this.dataNascimento,
        role: this.permissao,
        funcao: this.funcao,
        status: this.status,
        telefones: this.telefones,
        endereco: this.endereco,
        genero: this.genero,
        crmv: this.crmv, 
        ufcrmv: this.ufcrmv
    }
}

UsuarioSchema.methods.enviarAuthJson = function(){
    return{
        _id: this._id,
        nome: this.nome,
        email: this.email,
        role: this.permissao,
        token:this.gerarToken(),
    }
}

//Recuperação de senha
UsuarioSchema.methods.gerarTokenRecuperacao = function(){
    this.recovery = {};
    this.recovery.token = crypto.randomBytes(16).toString("hex");
    this.recovery.date = new Date( new Date().getTime() + 24*60*60*1000 );
    return this.recovery;
}

UsuarioSchema.methods.finalizarTokenRecuperacao = function(){
    this.recovery = {token: null, date: null}
    return this.recovery
}

module.exports = mongoose.model('Usuario', UsuarioSchema)


