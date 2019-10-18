const mongoose = require('mongoose')
const Especialidade = mongoose.model('Especialidade')

class EspecialidadeController {

    registrar(req, res, next) {
        const { descricao } = req.body;

        if (!descricao) return res.status(422).json({ error: "Preencha todos os campos para o cadastro." })

        const especialidade = new Especialidade({ descricao})
        
        especialidade.save().then((especialidade) => {
            res.json({
                especialidade
            })
        }).catch((err) => {
            console.log(err)
            next(err)
        })
    }

}

module.exports = EspecialidadeController