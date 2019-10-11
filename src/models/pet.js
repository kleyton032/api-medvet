const mongoose = require('mongoose');
Schema = mongoose.Schema;
const PetSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: [true,"não pode ficar vazio."],
    },
    idade:{
        type: Number,
        required: [true,"não pode ficar vazio."],
    },
    sexo:{
        type: String,
        required: [true,"não pode ficar vazio."],
    },
    raca:{
        type: String,
        required: [true,"não pode ficar vazio."],
    },
    peso:{
        type: String,
    },
    especie:{
        type: String,
        required: [true,"não pode ficar vazio."],
    },
    tutor:{
        type: Schema.Types.ObjectId,
        ref:'Tutor',
        required: [true,"não pode ficar vazio."],
    },
},{ timestamps: true });


module.exports = mongoose.model("Pet", PetSchema)