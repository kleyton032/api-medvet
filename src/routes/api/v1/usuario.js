const router = require('express').Router();

const UsuarioController = require('../../../controller/UsuarioController');

const usuarioController = new UsuarioController();

router.post('/registrar',usuarioController.registrar)
router.post('/',usuarioController.login)
module.exports = router