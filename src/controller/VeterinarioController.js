const mongoose = require('mongoose')
const Veterinario = mongoose.model('Veterinario')

class VeterinarioController {

    registrar(req, res, next) {
        const { nome, cpf, dataNascimento, crmv, ufcrmv, especialidades, telefones, endereco, email, password } = req.body;

        if (!nome || !cpf || !dataNascimento || !crmv || !ufcrmv || !especialidades || !telefones || !endereco || !email || !password) return res.status(422).json({ error: "Preencha todos os campos para o cadastro." })

        const veterinario = new Veterinario({ nome, cpf, dataNascimento, crmv, ufcrmv, especialidades, telefones, endereco, email, password })
        veterinario.setSenha(password)

        veterinario.save().then((veterinario) => {
            res.json({
                veterinario: veterinario.enviarAuthJson(),
                //veterinario
            })
        }).catch((err) => {
            console.log(err)
            next(err)
        })
    }
    //alterar vet
    //inativar vet
    //listar vets
    //listar vet por id


}

module.exports = VeterinarioController

//const Pet = require('../models/pet')
//const Tutor = require('../models/tutor')
/*
router.post('/cadastrar', async(req, res)=>{
    try {
        const vet = await Vet.create(req.body);
        res.send({vet})
    } catch (error) {
        res.status(400).send({ error: 'Erro no cadastro de Veterinário' });
        console.log(error)
    }
});

router.get('/listVet', async(req, res) =>{
    const vet = await Vet.find();
    res.send({vet})
})
*/