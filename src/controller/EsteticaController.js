const mongoose = require('mongoose');
const Estetica = mongoose.model("ServicosEsteticas")

class ServicosController {

    async create(req, res, next) {
        try {
            const { descricao, valor } = req.body;
            if (!descricao || !valor) return res.status(422).json({ error: "Preencha todos os campos para o cadastro." })

            const nome = await Estetica.findOne({ descricao: req.body.descricao });
            if (nome) return res.status(400).send({ error: "Descrição já Existente!!" });

            const estetica = new Estetica({ descricao, valor });

            await estetica.save();
            return res.send({ estetica });

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async list(req, res, next) {
        try {
            const esteticas = await Estetica.find()
            res.send({ esteticas })

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getId(req, res, next) {
        const { id: _id } = req.params;
        try {
            const estetica = await Estetica.findById(_id);
            if (!estetica) return res.status(422).json({ error: "Serviço de Estética não encontrado." })
            res.send({ estetica });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async update(req, res, next) {
        const { id: _id } = req.params;
        const { descricao, valor } = req.body;
        try {
            const estetica = await Estetica.findById(_id);
            if (!estetica) return res.status(422).json({ error: "Serviço de Estética não encontrado." })

            if (descricao) estetica.descricao = descricao;
            if (valor) estetica.valor = valor;

            await estetica.save()
            return res.send({ estetica })

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async remove(req, res, next) {
        const { id: _id } = req.params;
        try {
            const estetica = Estetica.findById(_id)
            if (!estetica) return res.status(422).json({ error: "Serviço de Estética não encontrado." })
            await estetica.remove()
            return res.send({ delatado: true })
        } catch (error) {
            console.log(error)
            next(error)
        }

    }

}


module.exports = ServicosController;

