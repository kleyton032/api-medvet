const mongoose = require('../config/database');

const TutorSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    cpf:{
        type:String,
        unique:true,
        required:true
    },
    telefones: [{
        type: String,
        required: true
    }],
    logradouro: [{
        type: String,
        required: true
    }],
    dataNascimento:{
        type:String,
        required:true
    },
    email:{
        type: String,
        unique: true,
        lowercase: true

    },
    pet:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'
    }],
    createAt: {
        type: Date,
        default: Date.now
    }
});

const Tutor = mongoose.model('Tutor', TutorSchema)
module.exports = Tutor