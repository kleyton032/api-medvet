const express = require('express')
const bodyParser = require('body-parser')
const PORT = 4001
app = express();

//configurações
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//Rotas temporarias
app.use('/api/tutor', require('../controller/TutorController'));
app.use('/api/pet', require('../controller/PetController'));
app.use('/api/vet', require('../controller/VetController'));

//atendimento/agenda
app.use('/api/atend/',
require('../controller/ProcedimentoController'), 
require('../controller/AgendaController'),
require('../controller/TipoAtendimentoController'));


app.listen(PORT, () => {
    console.log('Servidor rodando na porta ' + PORT);
})