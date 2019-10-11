const router = require('express').Router()

router.use('/pets', require('./pet'))
router.use('/tutor', require('./tutor'))

module.exports = router