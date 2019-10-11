
const express = require('express')
const router = express.Router();
const Ficha = require('../models/FichaAtendimento')

router.post('/registrarFicha', async (req, res) => {
        try {
        const ficha = await Ficha.create(req.body)
        res.send({ficha})
            
        } catch (error) {
            console.log(error)
        }
    })

module.exports = router