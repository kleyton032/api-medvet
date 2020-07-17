const router = require('express').Router();

const ServicosController = require('../../../controller/ServicosController');
const ExameController = require('../../../controller/ExamesController');
const auth = require('../../auth');
const { userValidation } = require('../../../controller/validacoes/userAdminValidation');

const servicosController = new ServicosController();
const exameController = new ExameController();

router.post('/registrarServ', auth.required, userValidation.admin, servicosController.registrarServico)
router.get('/listServices', auth.required, servicosController.listServicos)
router.get('/getService/:id', auth.required, servicosController.getServId)
router.put('/updateService/:id', auth.required, servicosController.updateServ)
router.delete('/deleteService/:id', auth.required, userValidation.admin, servicosController.remove)

//EXAMES
router.post('/registrarExame', auth.required, userValidation.admin, exameController.create)
router.get('/listExames', auth.required, exameController.list)
router.get('/getExame/:id', auth.required, exameController.getId)
router.put('/updateExame/:id', auth.required, exameController.update)
router.delete('/deleteExame/:id', auth.required, userValidation.admin, exameController.remove)

module.exports = router