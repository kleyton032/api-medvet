const express = require('express')

const Usuario = require('../models/Usuario')
const Pet = require('../models/Pet')

const router = express.Router();

router.post('/registerUser', async(req, res)=>{
    try {
        const user = await Usuario.create(req.body);
        res.send({user})
    } catch (error) {
        res.status(400).send({ error: 'Erro no cadastro de Usuário' });
        console.log(error)
    }
});

router.get('/listUser/:user_id', async(req, res) => {
    try {
        const user = await Usuario.findById(req.params.user_id).populate('funcionario')
        res.json({user})
    } catch (error) {
        res.status(400).send({ error: 'Erro ao consultar Usuário' });
        console.log(error)   
    }
})

//alterar usuário
//listar todos usuários
//inativar usuário
//autenticar usuário
//validar usuário
//verificar permissões usuario
module.exports = router