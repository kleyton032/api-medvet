const router = require('express').Router();

const UnidadeController = require('../../../controller/UnidadeController');

const unidadeController = new UnidadeController();

router.post('/registerUnidade', unidadeController.create)
router.put('/updateUnidade/:id', unidadeController.update)
router.get('/listUnidade/:id', unidadeController.getId)
router.delete('/removeUnidade/:id', unidadeController.remove)

module.exports = router