const mongoose = require('mongoose');
const Unidade = mongoose.model('Unidade');

class UnidadeController {

    async create(req, res, next) {
        try {
            const { nome, cnpj, telefones, endereco, titular } = req.body

            if (!nome || !cnpj || !endereco || !telefones || !titular) return res.status(422).json({ error: "Preencha todos os campos para o cadastro." })

            const unidade = new Unidade({ nome, cnpj, telefones, endereco, titular });

            await unidade.save();
            res.send({ unidade });

        } catch (error) {
            console.log(error);
            next(error);
        }
    }


    async getId(req, res, next) {
        const { id: _id } = req.params;
        console.log(_id)
         try {
            const unidade = await Unidade.findById(_id);
            if(!unidade) return res.status(422).json({ error: "Unidade não cadastrada." })
            console.log(unidade)
            return res.send({ unidade })
         } catch (error) {
            console.log(error);
            next(error);
         }
    }

    async update(req, res, next) {
        const { id: _id } = req.params;
        const { nome, cnpj, telefones, endereco, titular } = req.body
        try {
            const unidade = await Unidade.findById(_id);
            if (!unidade) return res.status(422).json({ error: "Unidade não cadastrada." })

            if (nome) unidade.nome = nome;
            if (telefones) unidade.telefones = telefones;
            if (cnpj) unidade.cnpj = cnpj;
            if (endereco) unidade.endereco = endereco;
            if (titular) unidade.titular = titular;

            await unidade.save()
            return res.send({ unidade })

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async remove(req, res, next) {
        const { id: _id } = req.params;
        try {
            const unidade = await Unidade.findById(_id);
            if (!unidade) return res.status(422).json({ error: "Unidade não cadastrada." })
            unidade.deletado = true
            await unidade.save()
            return res.send({ delatado: true })
        } catch (error) {
            console.log(error)
            next(error)
        }

    }



}

module.exports = UnidadeController;