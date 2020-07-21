const mongoose = require('mongoose');
const Unidade = mongoose.model('Unidade');

class UnidadeController {

    async create(req, res, next) {
        try {
            const { nome, cnpj, telefones, endereco, titular } = req.body

            if (!nome || !cnpj || !endereco || telefones || !titular) return res.status(422).json({ error: "Preencha todos os campos para o cadastro." })

            const unidade = new Unidade({ nome, cnpj, telefones, endereco, titular });

            //verificar se já não está cadastrado na base dados.

            await unidade.save();

            res.send({ unidade });

        } catch (error) {
            console.log(error);
            next(error);
        }
    }



}

module.exports = UnidadeController;