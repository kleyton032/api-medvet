const mongoose = require('mongoose')
const Usuario = mongoose.model('Usuario')
//const Funcionario = mongoose.model('Funcionario')

class UsuarioController {
    registrar(req, res, next) {
        const { nome, email, password, } = req.body;

        if (!nome || !email || !password) return res.status(422).json({ error: "Preencha todos os campos para o cadastro." })

        const usuario = new Usuario({ nome, email, password })
        usuario.setSenha(password)

        usuario.save().then((usuario) => {
            res.json({ usuario: usuario.enviarAuthJson() })
        }).catch((err) => {
            console.log(err)
            next(err)
        })
    }

    //autenticar usuário
    login(req, res, next) {
        const { email, password } = req.body

        if (!email) {
            return res.status(422).json({ error: "E-mail não pode ser vazio" })
        }
        if (!password) {
            return res.status(422).json({ error: "A senha não pode ser vazia" })
        }

        Usuario.findOne({ email }).populate({ path: "veterinario" }).populate({path: "funcionario" }).then((usuario) => {
            if (!usuario) {
                return res.status(401).json({ error: "Usuário não registrado" })
            }
            if (!usuario.validarSenha(password)) {
                return res.status(401).json({ error: "Senha inválida" })
            }
            res.json({
                usuario: usuario.enviarAuthJson()

            });
            console.log(usuario.id)


        }).catch((err) => {
            console.log(err)
            next(err)
        })

    }
}

//alterar usuário
//listar todos usuários
//inativar usuário

//validar usuário
//verificar permissões usuario
module.exports = UsuarioController;