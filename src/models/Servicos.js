const mongoose = require('mongoose')

const ServicosSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: true
    },
    valor: {
        type: Number,
        required: true
    }
})

const ServicosEsteticaSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: true
    },
    valor: {
        type: Number,
        required: true
    }
})

const ServicosExamesSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: true
    },
    valor: {
        type: Number,
        required: true
    }
})

const ServicosCirurgiasSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: true
    },
    valor: {
        type: Number,
        required: true
    }
})

const ServicosVacinasSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: true
    },
    valor: {
        type: Number,
        required: true
    }
})

const Servicos = mongoose.model("Servicos", ServicosSchema)
const ServicosEstetica = mongoose.model("ServicosEsteticas", ServicosEsteticaSchema)
const ServicosExames = mongoose.model("ServicosExames", ServicosExamesSchema)
const ServicosCirurgicos = mongoose.model("ServicosCirurgicos", ServicosCirurgiasSchema)
const ServicosVacinas = mongoose.model("ServicosVacinas", ServicosVacinasSchema)

module.exports = {
    Servicos,
    ServicosEstetica,
    ServicosExames,
    ServicosCirurgicos,
    ServicosVacinas
}