const express = require('express')

const Tutor = require('../models/tutor')

const router = express.Router();

router.post('/registrar', async(req, res)=>{
    try {
        const tutor = await Tutor.create(req.body);
        res.send({tutor})
    } catch (error) {
        res.status(400).send({ error: 'Erro no cadastro de Tutor' });
        console.log(err)
    }
});

router.get('/tutores', async (req, res)=>{
    try {
       // Fazendo uma consulta no banco de dados
        const tutores = await Tutor.find().populate('pet')
        res.send({tutores})
    } catch (error) {
        res.send('Erro ao tentar Selecionar Todos os usuários...: ' + error);
        console.log(error)
    }
 }); 

module.exports = router;