const router = require('express').Router();
const auth = require("../../auth")

const UsuarioController = require('../../../controller/UsuarioController');

const { userValidation } = require('../../../controller/validacoes/userAdminValidation')

const usuarioController = new UsuarioController();

router.post('/registrar', usuarioController.registrar)
router.post('/login', usuarioController.login)

router.get('/user/:id', auth.required, userValidation.med, usuarioController.getIdUser)
router.put('/updateUser/:id', auth.required, usuarioController.updateUser)

router.get('/recuperar-senha', usuarioController.forgotPassword)
router.post('/recuperar-senha', usuarioController.createForgotPassword)
router.get('/senha-recuperada', usuarioController.showCompleteForgot)
router.post('/senha-recuperada', usuarioController.completeForgot)


module.exports = router