const mongoose = require('mongoose')

const ServicoEsteticaSchema = new mongoose.Schema({
    descricao: {
        type:String,
        required:true
    },
    valor:{
        type:Number,
        required:true
    }
})

const ServicoEstetica = mongoose.model("ServicoEstetica", ServicoEsteticaSchema)

module.exports = ServicoEstetica;