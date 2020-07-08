const router = require('express').Router()

router.use('/pets', require('./pet'))
router.use('/tutor', require('./tutor'))
router.use('/funcionario', require('./funcionario'))
router.use('/usuario', require('./usuario'))
router.use('/especialidade', require('./especialidade'))
router.use('/veterinario', require('./veterinario'))
router.use('/servico', require('./servicos'))



module.exports = router