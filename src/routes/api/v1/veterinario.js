const router = require('express').Router();

const VeterinarioController = require('../../../controller/VeterinarioController');

const veterinarioController = new VeterinarioController();

router.post('/registrar',veterinarioController.registrar)
//router.post('/',veterinarioController.login)

module.exports = router