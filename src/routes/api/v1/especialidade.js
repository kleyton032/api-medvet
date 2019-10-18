const router = require('express').Router();

const EspecialidadeController = require('../../../controller/EspecialidadeController');

const especialidadeController = new EspecialidadeController();

router.post('/registrar',especialidadeController.registrar)

module.exports = router