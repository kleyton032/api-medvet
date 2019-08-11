const express = require('express')

const Tutor = require('../models/tutor')
const Pet = require('../models/pet')

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

router.get('/tutores/:tutor_id', async (req, res)=>{
    try {
       //Fazendo uma consulta no banco de dados
        const tutor = await Tutor.findById(req.params.tutor_id)
         //Realizando consulta na tabela pets e retornando o tutor vinculado a ela.
        const pets = await Pet.find({tutor:req.params.tutor_id})
        res.json({
            tutor, 
            pets
        })
    } catch (error) {
        res.send('Erro ao tentar Selecionar Todos os usuários...: ' + error);
        console.log(error)
    }
 }); 

module.exports = router;