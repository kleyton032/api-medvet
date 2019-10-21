const mongoose = require('mongoose')
const Veterinario = mongoose.model('Veterinario')
const Usuario = mongoose.model('Usuario')

class VeterinarioController {

    async registrar(req, res, next) {
        const { nome, cpf, dataNascimento, crmv, ufcrmv, especialidades, telefones, endereco } = req.body;

        const { email, password } = req.body;

        if (!nome || !cpf || !dataNascimento || !crmv || !ufcrmv || !especialidades || !telefones || !endereco || !email || !password) return res.status(422).json({ error: "Preencha todos os campos para o cadastro." })

        const veterinario = await Veterinario.create({ nome, cpf, dataNascimento, crmv, ufcrmv, especialidades, telefones, endereco })
        
        const usuario = new Usuario({ nome: veterinario.nome, email, password, permissao: "veterinario", veterinario: veterinario.id })
        usuario.setSenha(password)
        console.log(veterinario.id)
        usuario.save().then((usuario) => {
            res.json({ usuario: usuario.enviarAuthJson() })
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