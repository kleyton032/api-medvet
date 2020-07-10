const router = require('express').Router();

const ServicosController = require('../../../controller/ServicosController');
const auth = require('../../auth');
const {userValidation} = require('../../../controller/validacoes/userAdminValidation');

const servicosController = new ServicosController();

router.post('/registrarServ',auth.required, servicosController.registrarServico)
router.get('/listServices',servicosController.listServicos)

module.exports = router