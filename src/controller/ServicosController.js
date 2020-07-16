const mongoose = require('mongoose');
const Servicos = mongoose.model("Servicos")

class ServicosController {

    async registrarServico(req, res, next) {

        try {
            const { descricao, valor } = req.body;
            if (!descricao || !valor) return res.status(422).json({ error: "Preencha todos os campos para o cadastro." })

            const nome = await Servicos.findOne({ descricao: req.body.descricao });
            if (nome) return res.status(400).send({ error: "Descrição já Existente!!" });

            const service = new Servicos({ descricao, valor });

            await serv.save();
            return res.send({ service });

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async listServicos(req, res, next) {
        try {
            const services = await Servicos.find()
            res.send({ services })

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    //listar unico servico
    async getServId(req, res, next) {
        const { id: _id } = req.params;
        try {
            const service = await Servicos.findById(_id);
            if (!service) return res.status(422).json({ error: "Serviço não encontrado." })
            res.send({ service });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
   
    //editar servico
    async updateServ(req, res, next) {
        const { id: _id } = req.params;
        const { descricao, valor} = req.body;
        try {
            const service = await Servicos.findById(_id);
            if (!service) return res.status(422).json({ error: "Serviço não encontrado." })

            if(descricao) service.descricao = descricao;
            if(valor) service.valor = valor;

            await service.save()
            return res.send({service})

        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    
    //remover servico


}


module.exports = ServicosController;

