const router = require('express').Router();
const auth = require("../../auth")

const UsuarioController = require('../../../controller/UsuarioController');

const usuarioController = new UsuarioController();

router.post('/registrar',usuarioController.registrar)
router.post('/login',usuarioController.login)


router.put('/:id', auth.required, /*Validation(UsuarioValidation.upadate),*/ usuarioController.update)
//router.delete('/', auth.required, usuarioController.remove)

router.get('/recuperar-senha', usuarioController.forgotPassword)
router.post('/recuperar-senha', usuarioController.createForgotPassword)
router.get('/senha-recuperada', usuarioController.showCompleteForgot)
router.post('/senha-recuperada', usuarioController.completeForgot)

//router.get('/', auth.required, usuarioController.index)
//router.get('/:id', auth.required, /*Validation(UsuarioValidation.show),*/ usuarioController.show)


module.exports = router