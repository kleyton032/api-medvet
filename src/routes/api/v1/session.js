const router = require('express').Router();
const auth = require("../../auth")

const SessionController = require('../../../controller/SessionController');

const sessionController = new SessionController();

router.post('/auth',sessionController.auth)
router.get('/', auth.required, sessionController.indexAuth)

module.exports = router