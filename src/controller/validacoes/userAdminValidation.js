const mongooose = require('mongoose')
const Usuario = mongooose.model('Usuario')

const userValidation = {
    admin: (req, res, next) => {
        if(!req.payload.id) return res.sendStatus(401)
        Usuario.findById(req.payload.id).then((usuario) =>{
            if(!usuario) return res.sendStatus(401);
            if(!usuario.permissao.includes("admin")) return res.status(401).send({error:"Você não tem acesso de administrador para realizar a operação."});
            next();          
        }).catch(next);
    },
}
module.exports = {
    userValidation
}