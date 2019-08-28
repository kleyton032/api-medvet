const mongoose = require('../config/database');

const FuncionarioSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    cpf:{
        type: String,
        required: true
    },
    funcao:[{
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
        telefones:[{
            type: String,
            require: true
        }],
        createAt: {
            type: Date,
            default: Date.now
        }
})

const Funcionario = mongoose.model('Funcionario', FuncionarioSchema)
module.exports = Funcionario