const router =  require('express').Router()
//const auth = require('../../auth')

const TutorController = require('../../../controller/TutorController')

const tutorController = new TutorController();


router.post('/registrar',tutorController.registrar)
router.get('/:id',tutorController.getTutorId)
//router.put('/:id', auth.required, usuarioController.update)
//router.delete('/', auth.required, usuarioController.remove)


module.exports = router