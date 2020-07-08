const router = require('express').Router();

const ServicosController = require('../../../controller/ServicosController');

const servicosController = new ServicosController();

router.post('/registrarServ',servicosController.registrarServico)

module.exports = router