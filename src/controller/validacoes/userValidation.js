const mongooose = require('mongoose')
const Usuario = mongooose.model('Usuario')

const userValidation = {
    admin: (req, res, next) => {
        if (!req.payload.id) return res.status(401).send({ error: "Não Autorizado!!" })
        Usuario.findById(req.payload.id).then((usuario) => {
            if (!usuario) return res.status(401).send({ error: "Usuário Não encontrado!!" });
            if (!usuario.permissao.includes("admin")) return res.status(401).send({ error: "Você não tem acesso de administrador para realizar a operação." });
            next();
        }).catch(next);
    },

    med: (req, res, next) => {
        if (!req.payload.id) return res.status(401).send({ error: "Não Autorizado!!" })
        Usuario.findById(req.payload.id).then((usuario) => {
            if (!usuario) return res.status(401).send({ error: "Usuário Não encontrado!!" });
            if (usuario.funcao != "MEDICO") return res.status(401).send({ error: "Você não tem acesso de médico para realizar a operação." });
            next();
        }).catch(next);
    }
}
module.exports = {
    userValidation
}