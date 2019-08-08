const mongoose = require('../config/database');

const PetSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    idade:{
        type: Number,
        required: true
    },
    sexo:{
        type: String,
        required: true
    },
    raca:{
        type: String,
        required: true
    },
    peso:{
        type: Number,
        required: true
    },
    especie:{
        type: String,
        required: true
    },
    tutor:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Tutor',
        required: true
    }],
    createAt: {
        type: Date,
        default: Date.now
    }
})

const Pet = mongoose.model('Pet', PetSchema)
module.exports = Pet