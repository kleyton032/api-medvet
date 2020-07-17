const mongoose = require('mongoose');
const Vacina = mongoose.model("ServicosVacinas")

class ServicosController {

    async create(req, res, next) {
        try {
            const { descricao, valor } = req.body;
            if (!descricao || !valor) return res.status(422).json({ error: "Preencha todos os campos para o cadastro." })

            const nome = await Vacina.findOne({ descricao: req.body.descricao });
            if (nome) return res.status(400).send({ error: "Descrição já Existente!!" });

            const vacina = new Vacina({ descricao, valor });

            await vacina.save();
            return res.send({ vacina });

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async list(req, res, next) {
        try {
            const vacina = await Vacina.find()
            res.send({ vacina })

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getId(req, res, next) {
        const { id: _id } = req.params;
        try {
            const vacina = await Vacina.findById(_id);
            if (!vacina) return res.status(422).json({ error: "Serviço de Vacina não encontrado." })
            res.send({ vacina });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async update(req, res, next) {
        const { id: _id } = req.params;
        const { descricao, valor } = req.body;
        try {
            const vacina = await Vacina.findById(_id);
            if (!vacina) return res.status(422).json({ error: "Serviço de Vacina não encontrado." })

            if (descricao) vacina.descricao = descricao;
            if (valor) vacina.valor = valor;

            await ciruvacinargia.save()
            return res.send({ vacina })

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async remove(req, res, next) {
        const { id: _id } = req.params;
        try {
            const vacina = Vacina.findById(_id)
            if (!vacina) return res.status(422).json({ error: "Serviço de Vacina não encontrado." })
            await vacina.remove()
            return res.send({ delatado: true })
        } catch (error) {
            console.log(error)
            next(error)
        }

    }

}


module.exports = ServicosController;

