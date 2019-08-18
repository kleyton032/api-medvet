const mongoose = require('../config/database');

const ProcedimentoSchema = new mongoose.Schema({
    descricao: {
        type:String,
        required:true
    },
    valor:{
        type: Number,
        required: true
    }
})

const Procedimento = mongoose.model("Procedimento", ProcedimentoSchema)

module.exports = Procedimento