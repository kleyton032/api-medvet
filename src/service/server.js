const express = require('express')
const bodyParser = require('body-parser')
const PORT = 4001
app = express();

//configurações
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use('/api/tutor', require('../controller/tutorController'));
app.use('/api/pet', require('../controller/petController'));

app.listen(PORT, () => {
    console.log('Servidor rodando na porta ' + PORT);
})