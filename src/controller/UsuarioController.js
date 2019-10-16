const mongoose = require('mongoose')
const Usuario = mongoose.model('Usuario')

class UsuarioController {
    registrar(req, res, next) {
        const {nome, email, password, }
    }
}

//alterar usuário
//listar todos usuários
//inativar usuário
//autenticar usuário
//validar usuário
//verificar permissões usuario
module.exports = router