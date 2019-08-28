const express = require('express')

const Funcionario = require('../models/Funcionario')
const Pet = require('../models/Pet')

const router = express.Router();

router.post('/registrarFuncionario', async(req, res)=>{
    try {
        const funcionario = await Funcionario.create(req.body);
        res.send({funcionario})
    } catch (error) {
        res.status(400).send({ error: 'Erro no cadastro de Funcionário' });
        console.log(error)
    }
});

//alterar funcionairo
//listar funcionario pelo id
//listar todos funcionario
//inativar funcionario ** verificar para alterar o model

module.exports = router