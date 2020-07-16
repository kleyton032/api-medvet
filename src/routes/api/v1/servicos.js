const router = require('express').Router();

const ServicosController = require('../../../controller/ServicosController');
const auth = require('../../auth');
const { userValidation } = require('../../../controller/validacoes/userAdminValidation');

const servicosController = new ServicosController();

router.post('/registrarServ', auth.required, userValidation.admin, servicosController.registrarServico)
router.get('/listServices', auth.required, servicosController.listServicos)

module.exports = router