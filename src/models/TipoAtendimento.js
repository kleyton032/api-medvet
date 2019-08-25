const mongoose = require('../config/database');

const TipoAtendimnetoSchema = new mongoose.Schema({
    descricao:{
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

const TipoAtendimento = mongoose.model('TipoAtendimento', TipoAtendimnetoSchema)
module.exports = TipoAtendimento