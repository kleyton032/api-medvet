const router = require('express').Router();

const ServicosController = require('../../../controller/ServicosController');
const ExameController = require('../../../controller/ExamesController');
const CirurgiaController = require('../../../controller/CirurgiaController');
const VacinaController = require('../../../controller/VacinaController');
const auth = require('../../auth');
const { userValidation } = require('../../../controller/validacoes/userAdminValidation');

const servicosController = new ServicosController();
const exameController = new ExameController();
const cirurgiaController = new CirurgiaController();
const vacinaController = new VacinaController();

router.post('/registrarServ', auth.required, userValidation.admin, servicosController.registrarServico)
router.get('/listServices', auth.required, servicosController.listServicos)
router.get('/getService/:id', auth.required, servicosController.getServId)
router.put('/updateService/:id', auth.required, servicosController.updateServ)
router.delete('/deleteService/:id', auth.required, userValidation.admin, servicosController.remove)

//EXAMES
router.post('/createExame', auth.required, userValidation.admin, exameController.create)
router.get('/listExames', auth.required, exameController.list)
router.get('/getExame/:id', auth.required, exameController.getId)
router.put('/updateExame/:id', auth.required, exameController.update)
router.delete('/deleteExame/:id', auth.required, userValidation.admin, exameController.remove)


//CIRURGIAS
router.post('/createCirurgia', auth.required, userValidation.admin, cirurgiaController.create)
router.get('/listCirurgia', auth.required, cirurgiaController.list)
router.get('/getCirurgia/:id', auth.required, cirurgiaController.getId)
router.put('/updateCirurgia/:id', auth.required, cirurgiaController.update)
router.delete('/deleteCirurgia/:id', auth.required, userValidation.admin, cirurgiaController.remove)

//CIRURGIAS
router.post('/createVacina', auth.required, userValidation.admin, vacinaController.create)
router.get('/listVacina', auth.required, vacinaController.list)
router.get('/getVacina/:id', auth.required, vacinaController.getId)
router.put('/updateVacina/:id', auth.required, vacinaController.update)
router.delete('/deleteVacina/:id', auth.required, userValidation.admin, vacinaController.remove)

module.exports = router