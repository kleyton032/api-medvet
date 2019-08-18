const express = require('express');
const Procedimento = require('../models/Procedimento')

const router = express();

router.post('/register/proced',  (req, res)=>{
    try {
        const proced =  Procedimento.create(req.body);
        res.send({proced})
    } catch (error) {
        res.status(400).send({ error: 'Erro no cadastro de Procedimento' });
        console.log(error)
    }
});

module.exports = router

