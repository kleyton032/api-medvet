const router = require('express').Router();

const ServicosController = require('../../../controller/ServicosController');
const auth = require('../../auth');
const { userValidation } = require('../../../controller/validacoes/userAdminValidation');

const servicosController = new ServicosController();

router.post('/registrarServ', auth.required, userValidation.admin, servicosController.registrarServico)
router.get('/listServices', auth.required, servicosController.listServicos)
router.get('/getService/:id', auth.required, servicosController.getServId)
router.put('/updateService/:id', auth.required, servicosController.updateServ)


module.exports = router