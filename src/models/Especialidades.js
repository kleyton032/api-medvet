const mongoose = require('mongoose')

const EspecialidadeSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Especialidade', EspecialidadeSchema)