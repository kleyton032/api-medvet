const express = require('express')
const Vet = require('../models/Veterinario')


//const Pet = require('../models/pet')
//const Tutor = require('../models/tutor')

const router = express.Router();


router.post('/cadastrar', async(req, res)=>{
    try {
        const vet = await Vet.create(req.body);
        res.send({vet})
    } catch (error) {
        res.status(400).send({ error: 'Erro no cadastro de Veterinário' });
        console.log(error)
    }
});

module.exports = router