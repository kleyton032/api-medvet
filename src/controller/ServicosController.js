const mongoose = require('mongoose');
const Servicos = mongoose.model("Servicos")

class ServicosController {

    async registrarServico(req, res, next) {

        try {
            const { descricao, valor } = req.body;
            if (!descricao || !valor) return res.status(422).json({ error: "Preencha todos os campos para o cadastro." })

            const nome = await Servicos.findOne({descricao: req.body.descricao });
            if(nome) return res.status(400).send({ error: "Descrição já Existente!!" });

            const serv = new Servicos({ descricao, valor });

            await serv.save();
            return res.send({ serv });

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

        async listServicos(req, res, next) {
            try {
                const services = await Servicos.find()
                res.send({services})

            } catch (error) {
                console.log(error);
                next(error);
            }    
        }


        //listar servicos
        //listar unico servico
        //editar servico
        //remover servico


    }


module.exports = ServicosController;
