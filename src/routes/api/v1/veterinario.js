const router = require('express').Router();

const VeterinarioController = require('../../../controller/VeterinarioController');

const veterinarioController = new VeterinarioController();

router.post('/registrar',veterinarioController.registrar)


module.exports = router