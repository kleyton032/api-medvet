const compression =require('compression'); 
const express = require('express')
const ejs = require('ejs');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan');
const cors = require('cors');

app = express();
const isProduction = process.env.NODE_ENV === "production"
const PORT = process.env.PORT || 4000


//Arquvos estaticos
//app.use('/public', express.static(__dirname + '/public'));
//app.use('/public/images', express.static(__dirname + '/public/images'));

//configurações
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//config mongo
const dbs = require('../config/database')
const dbURI = isProduction ? dbs.dbProduction : dbs.dbTest
mongoose.connect(dbURI, {useNewUrlParser: true});

//config view engine
app.set('view engine', 'ejs');

//configurações
if(!isProduction) app.use(morgan('dev'));
app.use(cors());
app.disable('x-powered-by');
app.use(compression());

app.use(bodyParser.urlencoded({extended:false, limit: 1.5*1024*1024}));
app.use(bodyParser.json({limit: 1.5*1024*1024}));

//models
require('../models')

//config Rotas
app.use('/', require('../routes'));


//Rotas - 404
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//Rotas - 500, 422, 401
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    if(err.status !== 404) console.warn('Error: ', err.message, new Date())
    res.json({error:{message: err.message, status: err.status}})
});

//Rodando server
app.listen(PORT, (err) => {
    if(err) throw err;
    console.log(`Rodando na ${PORT}`)
})

//Rotas temporarias

/** 
app.use('/api/tutor', require('../controller/TutorController'));
app.use('/api/pet', require('../controller/PetController'));
app.use('/api/vet', require('../controller/VetController'));
app.use('/api/func', require('../controller/FuncionarioController'));
app.use('/api/user', require('../controller/UsuarioController'));
app.use('/api/ficha', require('../controller/FichaAtendimento'));
app.use(require('../controller/PartnerController'))


//atendimento/agenda
app.use('/api/atend/',
require('../controller/ProcedimentoController'), 
require('../controller/AgendaController'),
require('../controller/TipoAtendimentoController'));
*/
module.exports = app