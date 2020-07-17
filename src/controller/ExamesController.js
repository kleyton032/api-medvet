const mongoose = require('mongoose');
const Exames = mongoose.model("ServicosExames")

class ServicosController {

    async create(req, res, next) {
        try {
            const { descricao, valor } = req.body;
            if (!descricao || !valor) return res.status(422).json({ error: "Preencha todos os campos para o cadastro." })

            const nome = await Exames.findOne({ descricao: req.body.descricao });
            if (nome) return res.status(400).send({ error: "Descrição já Existente!!" });

            const exame = new Exames({ descricao, valor });

            await exame.save();
            return res.send({ exame });

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async list(req, res, next) {
        try {
            const exames = await Exames.find()
            res.send({ exames })

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getId(req, res, next) {
        const { id: _id } = req.params;
        try {
            const exame = await Exames.findById(_id);
            if (!exame) return res.status(422).json({ error: "Exame não encontrado." })
            res.send({ exame });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async update(req, res, next) {
        const { id: _id } = req.params;
        const { descricao, valor } = req.body;
        try {
            const exame = await Exames.findById(_id);
            if (!exame) return res.status(422).json({ error: "Exame não encontrado." })

            if (descricao) exame.descricao = descricao;
            if (valor) exame.valor = valor;

            await exame.save()
            return res.send({ exame })

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async remove(req, res, next) {
        const { id: _id } = req.params;
        try {
            const exame = Exames.findById(_id)
            if (!exame) return res.status(422).json({ error: "Exame não encontrado." })
            await exame.remove()
            return res.send({ delatado: true })
        } catch (error) {
            console.log(error)
            next(error)
        }

    }

}


module.exports = ServicosController;

