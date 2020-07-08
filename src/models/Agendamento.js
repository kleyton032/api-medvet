const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AgendamentoSchema = Schema({
    dataHora: { type: Date, required: true },
    pet: { type: Schema.Types.ObjectId, ref: 'Pet' },
    veterinario: { type: Schema.Types.ObjectId, ref: 'Veterinario' },
    pacienteProvisorio: {
        type: {
            nomeTutor: { type: String },
            nomePet: { type: String },
            telefones: { type: [{ type: String }] },
        }
    }
})
module.exports = mongoose.model("Agendamento", AgendamentoSchema)