const router = require('express').Router();
const auth = require("../../auth")

const UsuarioController = require('../../../controller/UsuarioController');

const { userValidation } = require('../../../controller/validacoes/userValidation')

const usuarioController = new UsuarioController();

//router admin
router.post('/register', usuarioController.create)
router.put('/inactivateUser/:id', auth.required, userValidation.admin, usuarioController.inactivateUser)
router.put('/activeUser/:id', auth.required, userValidation.admin, usuarioController.activeUser)
router.get('/getUsers', auth.required, userValidation.admin, usuarioController.show)


router.post('/login', usuarioController.login)
router.get('/', auth.required, usuarioController.getUser)
router.put('/updateUser/:id', auth.required, usuarioController.updateUser)

//forgot password
router.get('/recuperar-senha', usuarioController.forgotPassword)
router.post('/recuperar-senha', usuarioController.createForgotPassword)
router.get('/senha-recuperada', usuarioController.showCompleteForgot)
router.post('/senha-recuperada', usuarioController.completeForgot)


module.exports = router