const mongoose = require('mongoose')

const ServicosSchema = new mongoose.Schema({
    descricao: {
        type:String,
        required:true
    },
    valor:{
        type:Number,
        required:true
    }
})

const Servicos = mongoose.model("Servicos", ServicosSchema)

module.exports = Servicos;