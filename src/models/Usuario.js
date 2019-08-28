const mongoose = require('../config/database');

const Userchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    senha:{
        type: Number,
        required: true,
        select: false
    },
    acessos:[{
        type: String,
        required: true
    }],
    funcionario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Funcionario',
      
    },
    veterinario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vet',
        
    },
    ativo:{
        type: Boolean,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    passwordResetToken: {
        type:String,
        select: false
    },
    passwordResetExpires:{
        type:Date,
        select: false
    },
})

const User = mongoose.model('User', Userchema)
module.exports = User