const router = require('express').Router();

const UnidadeController = require('../../../controller/UnidadeController');

const unidadeController = new UnidadeController();

router.post('/registerUnidade', unidadeController.create)

module.exports = router