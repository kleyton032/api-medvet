const mongoose = require('mongoose')
const Veterinario = mongoose.model('Veterinario')
const Usuario = mongoose.model('Usuario')

class VeterinarioController {

    async registrar(req, res, next) {
        const { nome, cpf, dataNascimento, crmv, ufcrmv, especialidades, telefones, endereco } = req.body;

        const { email, password, permissao } = req.body;

        try {
            if (!nome || !cpf || !dataNascimento || !crmv || !ufcrmv || !especialidades || !telefones || !endereco || !email || !password || !permissao) return res.status(422).json({ error: "Preencha todos os campos para o cadastro." })
            
            const usuario = new Usuario({ nome, email, password, permissao})
            usuario.setSenha(password)
            const veterinario = new Veterinario({nome, cpf, dataNascimento, crmv, ufcrmv, especialidades, telefones, endereco, usuario: usuario._id })
    
            await usuario.save()
            await veterinario.save()

            return res.send({veterinario: Object.assign({nome:veterinario.nome, email: usuario.email, cpf: veterinario.cpf, especialidades: veterinario.especialidades })})
            
        } catch (error) {
            console.log(error)
            next(error)
        }
   
    }
    //alterar vet
    //inativar vet
    //listar vets
    //listar vet por id


}

module.exports = VeterinarioController
