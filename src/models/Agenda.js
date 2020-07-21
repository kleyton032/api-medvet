const mongoose = require('../config/database');

const AgendaSchema = new mongoose.Schema({
    medicoVet:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Vet',
        required: true
    },
    tutor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Tutor'
    },
    data:{
        type: Date,
        default: Date.UTC,
        required:true
    },
    telefone:[{
        type: Number,
        required:true
    }],
    createAt: {
        type: Date,
        default: Date.now
    }
})

const Agenda = mongoose.model('Agenda', AgendaSchema)
module.exports = Agenda