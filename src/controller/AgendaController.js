const express = require('express')
const Agenda = require('../models/Agenda')


const router = express.Router();

router.post('/registrarAgendamento', async(req, res)=>{

    try {
        const agendamento = await Agenda.create(req.body);
        res.send({agendamento})
    } catch (error) {
        res.status(400).send({ error: 'Erro ao registrar Agendamento' });
        console.log(error)   
    }
})


router.get('/consultaAgendamento/:agenda_id', async(req, res) => {
    try {
        const agenda = await Agenda.findById(req.params.agenda_id).populate('medicoVet', 'nome').populate('tutor', 'nome').populate('tipoAtendimento', 'descricao')
        res.json({agenda})
    } catch (error) {
        res.status(400).send({ error: 'Erro ao consultar Agendamento' });
        console.log(error)   
    }
})

//listar todos agendamento
//listar agendamentos com períodos e datas
//alterar agendamento
//remover agendamento

module.exports = router