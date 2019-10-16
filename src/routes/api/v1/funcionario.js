const router =  require('express').Router()
//const auth = require('../../auth')

const FuncionarioController = require('../../../controller/FuncionarioController')

const funcionarioController = new FuncionarioController();

router.post('/registrar',funcionarioController.registrar)

module.exports = router