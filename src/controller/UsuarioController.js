const mongoose = require('mongoose')
const Usuario = mongoose.model('Usuario')

class UsuarioController {

    async store(req, res, next) {
        try {
            const { nome, email, password, cpf, telefones, endereco, dataNascimento, funcao, crmv, ufcrmv, permissao, unidade, genero } = req.body;

            if (!nome || !email || !password || !cpf || !telefones || !endereco || !dataNascimento || !funcao || !permissao || !unidade || !genero) return res.status(422).json({ error: "Preencha todos os campos para o cadastro." })

            const userExits = await Usuario.findOne({cpf: cpf})

            const usuario = new Usuario({ nome, email, cpf, telefones, endereco, dataNascimento, funcao, crmv, ufcrmv, permissao, unidade, genero })

            if(userExits) return res.status(400).send({error: " CPF já Cadastrado"});

            usuario.setSenha(password)

            await usuario.save();
            res.send({ usuario: usuario.enviarAuthJson() })
        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    //alterar usuário
    async updateUser(req, res, next) {
        const { id: _id } = req.params;
        console.log(_id)
        const { nome, email, password, cpf, telefones, endereco, dataNascimento, funcao, crmv, ufcrmv, genero } = req.body;
        try {
            const user = await Usuario.findById(_id);
            if (!user) return res.status(422).json({ error: "Usuário não encontrado!" })

            if (nome) user.nome = nome;
            if (email) user.email = email;
            if (password) user.password = password;
            if (cpf) user.cpf = cpf;
            if (dataNascimento) user.dataNascimento = dataNascimento;
            if (telefones) user.telefones = telefones;
            if (endereco) user.endereco = endereco;
            if (funcao) user.funcao = funcao;
            if (crmv) user.crmv = crmv;
            if (ufcrmv) user.ufcrmv = ufcrmv;
            if (genero) user.genero = genero;

            await user.save()
            return res.send({ user: user.getUserId() })
        } catch (error) {
            next(error);
        }
    }
   
     //listar todos usuários
     async show(req, res, next){
       try {
           const users = await Usuario.find().populate({path: 'unidade', select: 'nome cnpj'});
           res.send({users})
       } catch (error) {
           next(error);
       }   
     }
   
    //verificar permissões usuario

  
}







module.exports = UsuarioController;