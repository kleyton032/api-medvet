const express = require('express')

//const Pet = require('../models/Pet')
//const Tutor = require('../models/Tutor')
const TipoAtendimento = require('../models/TipoAtendimento')

const router = express.Router();

router.post('/registrarTipoAtendimento', async(req, res)=>{

    try {
        const tipo = await TipoAtendimento.create(req.body);
        res.send({tipo})
    } catch (error) {
        res.status(400).send({ error: 'Erro ao registrar Tipo do Atendimento' });
        console.log(error)   
    }
    

})

module.exports = router