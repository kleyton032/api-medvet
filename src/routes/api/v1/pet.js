const router =  require('express').Router()
//const auth = require('../../auth')

const PetController = require('../../../controller/PetController')

const petController = new PetController();

//router.post('/login', usuarioController.login)
router.post('/registrar',petController.registrar)
//router.put('/:id', auth.required, usuarioController.update)
//router.delete('/', auth.required, usuarioController.remove)


//router.get('/recuperar-senha', usuarioController.showRecovery)
//router.post('/recuperar-senha', usuarioController.createRecovery)
//router.get('/senha-recuperada', usuarioController.showCompleteRecovery)
//router.get('/senha-recuperada', usuarioController.completeRecovery)

router.get('/', petController.index)
router.get('/:id', petController.getPetId)

module.exports = router