const mongoose = require('mongoose');
const Funcionario = mongoose.model('Funcionario')
const Usuario = mongoose.model('Usuario')

class FuncionarioController {

    async registrar(req, res, next) {

        const { nome, cpf, dataNascimento, funcao, telefones, endereco } = req.body;

        const { email, password, permissao } = req.body;

        if (!nome || !cpf || !dataNascimento ||! funcao || !telefones || !endereco || !email || !password) return res.status(422).json({ error: "Preencha todos os campos para o cadastro." })

        const funcionario = await Funcionario.create({ nome, cpf, dataNascimento, funcao, telefones, endereco })
        
        const usuario = new Usuario({ nome: funcionario.nome, email, password, permissao, funcionario: funcionario.id })
        usuario.setSenha(password)
        console.log(funcionario.id)
        usuario.save().then((usuario) => {
            res.json({ usuario: usuario.enviarAuthJson() })
        }).catch((err) => {
            console.log(err)
            next(err)
        })



/** 
        const funcDados = req.body

        const funcionario = new Funcionario(funcDados)

        funcionario.save().then((funcionario) => {
            res.json({ funcionario })
        }).catch((err) => {
            console.log(err)
            next(err)
        })
        */
    }

    //alterar funcionairo
    //listar funcionario pelo id
    getFuncionarioId(req, res, next){
        Funcionario.findById(req.params.id)
        .then(funcionario => {
            if (!funcionario) {
                return res.status(401).json({ error: "Funcionário não registrado" })
            }
            return res.json({funcionario})
        }).catch((err)=>{
            console.log(err)
            next(err)
        })

    }
    //listar todos funcionario
    //inativar funcionario ** verificar para alterar o model


}


module.exports = FuncionarioController;