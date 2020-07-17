const mongoose = require('mongoose');
const Cirurgia = mongoose.model("ServicosCirurgicos")

class ServicosController {

    async create(req, res, next) {
        try {
            const { descricao, valor } = req.body;
            if (!descricao || !valor) return res.status(422).json({ error: "Preencha todos os campos para o cadastro." })

            const nome = await Cirurgia.findOne({ descricao: req.body.descricao });
            if (nome) return res.status(400).send({ error: "Descrição já Existente!!" });

            const cirurgia = new Cirurgia({ descricao, valor });

            await cirurgia.save();
            return res.send({ cirurgia });

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async list(req, res, next) {
        try {
            const cirurgia = await Cirurgia.find()
            res.send({ cirurgia })

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getId(req, res, next) {
        const { id: _id } = req.params;
        try {
            const cirurgia = await Cirurgia.findById(_id);
            if (!cirurgia) return res.status(422).json({ error: "Serviço cirurgico não encontrado." })
            res.send({ cirurgia });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async update(req, res, next) {
        const { id: _id } = req.params;
        const { descricao, valor } = req.body;
        try {
            const cirurgia = await Cirurgia.findById(_id);
            if (!cirurgia) return res.status(422).json({ error: "Serviço cirurgico não encontrado." })

            if (descricao) cirurgia.descricao = descricao;
            if (valor) cirurgia.valor = valor;

            await cirurgia.save()
            return res.send({ cirurgia })

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async remove(req, res, next) {
        const { id: _id } = req.params;
        try {
            const cirurgia = Cirurgia.findById(_id)
            if (!cirurgia) return res.status(422).json({ error: "Serviço cirurgico não encontrado." })
            await cirurgia.remove()
            return res.send({ delatado: true })
        } catch (error) {
            console.log(error)
            next(error)
        }

    }

}


module.exports = ServicosController;

