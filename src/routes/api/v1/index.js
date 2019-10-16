const router = require('express').Router()

router.use('/pets', require('./pet'))
router.use('/tutor', require('./tutor'))
router.use('/funcionario', require('./funcionario'))


module.exports = router