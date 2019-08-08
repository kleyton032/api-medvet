const express = require('express')

const Pet = require('../models/pet')

const router = express.Router();

router.post('/cadastrar', async(req, res)=>{
    try {
        const pet = await Pet.create(req.body);
        res.send({pet})
    } catch (error) {
        res.status(400).send({ error: 'Erro no cadastro de Pets' });
        console.log(err)
    }
});

router.get('/pets', async(req, res)=>{
    try {
       const pets = await Pet.find().populate('tutor')
        res.json(pets)
    }catch (error) {
        res.send('Erro ao tentar Selecionar Todos os pets...: ' + error);
        console.log(error)
    }
})

module.exports = router;