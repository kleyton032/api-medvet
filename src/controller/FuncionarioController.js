const mongoose = require('mongoose');
const Funcionario = mongoose.model('Funcionario')

class FuncionarioController {

    registrar(req, res, next) {
        const funcDados = req.body

        const funcionario = new Funcionario(funcDados)

        funcionario.save().then((funcionario) => {
            res.json({ funcionario })
        }).catch((err) => {
            console.log(err)
            next(err)
        })
    }

    //alterar funcionairo
    //listar funcionario pelo id
    //listar todos funcionario
    //inativar funcionario ** verificar para alterar o model


}


module.exports = FuncionarioController;