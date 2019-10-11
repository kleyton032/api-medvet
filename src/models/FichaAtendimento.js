const mongoose = require('../config/database');


//campo para add user que está registrando ficha atendimento.
const FichaAtendimento = new mongoose.Schema({
    tutor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Tutor',
        required: true
    },
    pet:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Pet',
        required: true
    },
    vet:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Vet', 
        required: true
    },
    tipoAtendimento:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'TipoAtendimento',
        required: true
    },
    data_atendimento:{
        type: Date,
        default: Date.now,
    },
    anamenese:{
        type: String,
        required:true,
    },
    data_retorno:{
        type: String,
        //campos será add no documento agenda com os campos, vet, pet, tutor, a data 
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt:{
        type: Date,
        default: Date.now
    }
})

const Ficha = mongoose.model('Ficha', FichaAtendimento)
module.exports = Ficha