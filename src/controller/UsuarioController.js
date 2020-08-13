const mongoose = require('mongoose')
const Usuario = mongoose.model('Usuario')
const enviarEmailRecovery = require('../helpers/email-forgot')

class UsuarioController {

    async create(req, res, next) {
        try {
            const { nome, email, password, cpf, telefones, endereco, dataNascimento, funcao, crmv, ufcrmv, permissao, unidade, genero } = req.body;

            if (!nome || !email || !password || !cpf || !telefones || !endereco || !dataNascimento || !funcao || !permissao || !unidade || !genero) return res.status(422).json({ error: "Preencha todos os campos para o cadastro." })

            const usuario = new Usuario({ nome, email, password, cpf, telefones, endereco, dataNascimento, funcao, crmv, ufcrmv, permissao, unidade, genero })
            usuario.setSenha(password)

            await usuario.save();
            res.send({ usuario: usuario.enviarAuthJson() })
        } catch (error) {
            next(error);
        }


    }

    //autenticar usuário
    login(req, res, next) {
        const { email, password } = req.body

        if (!email) {
            return res.status(422).json({ error: "E-mail não pode ser vazio" })
        }
        if (!password) {
            return res.status(422).json({ error: "A senha não pode ser vazia" })
        }

        Usuario.findOne({ email }).populate({ path: "veterinario" }).populate({ path: "funcionario" }).then((usuario) => {
            if (!usuario) {
                return res.status(401).json({ error: "Usuário não registrado" })
            }

            if (usuario.status === "inativo") return res.status(401).json({ error: "Falha na autenticação" })

            if (!usuario.validarSenha(password)) {
                return res.status(401).json({ error: "Senha inválida" })
            }
            res.json({
                usuario: usuario.enviarAuthJson()

            });

        }).catch((err) => {
            console.log(err)
            next(err)
        })

    }

    //retonar unico usuário
    async getIdUser(req, res, next) {
        const { id: _id } = req.params;
        try {
            const user = await Usuario.findById(_id)
            res.send({ user: user.getUserId() })

        } catch (error) {
            next(error)
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
    //inativar usuário
    async inactivateUser(req, res, next) {
        const { id: _id } = req.params;
        try {
            const user = await Usuario.findById(_id);
            if (!user) return res.status(422).json({ error: "Usuário não encontrado!" })
            user.status = "inativo"
            await user.save()
            res.send({ user: user.getUserId() })
        } catch (error) {
            next(error)
        }
    }

    async activeUser(req,res, next) {
        const { id: _id } = req.params;
        try {
            const user = await Usuario.findById(_id);
            if (!user) return res.status(422).json({ error: "Usuário não encontrado!" })
            user.status = "ativo"
            await user.save()
            res.send({ user: user.getUserId() })
        } catch (error) {
            next(error)
        }
    }

    forgotPassword(req, res, next) {
        return res.render('recovery', { error: null, success: null })
    }

    createForgotPassword(req, res, next) {
        const { email } = req.body

        if (!email) return res.render('recovery', { error: "Preencha com seu E-mail", success: null })

        Usuario.findOne({ email }).then((usuario) => {
            if (!usuario) return res.render('recovery', { error: "Não existe usuário com esse e-mail", success: null })

            const recoveryData = usuario.gerarTokenRecuperacao();
            return usuario.save().then(() => {
                enviarEmailRecovery({ usuario, recovery: recoveryData }, (error = null, success = null) => {
                    return res.render('recovery', { error, success })
                })

            }).catch((err) => {
                console.log(err)
                next(err)
            })
        }).catch((err) => {
            console.log(err)
            next(err)
        })
    }

    showCompleteForgot(req, res, next) {
        if (!req.query.token) return res.render('recovery', { error: "Token não identificado", success: null })

        Usuario.findOne({ "recovery.token": req.query.token }).then((usuario) => {
            if (!usuario) return res.render('recovery', { error: "Não existe usuário com esse token", success: null })

            if (new Date(usuario.recovery.date) < new Date()) return res.render('recovery', { error: "Token expirando, tente novamente", success: null })

            return res.render('recovery/store', { error: null, success: null, token: req.query.token })
        }).catch((err) => {
            console.log(err)
            next(err)
        })
    }

    completeForgot(req, res, next) {
        const { token, password } = req.body

        if (!token || !password) return res.render('recovery/store', { error: "Preencha novamente com sua nova senha", success: null })

        Usuario.findOne({ "recovery.token": token }).then((usuario) => {
            if (!usuario) {
                return res.render('recovery', { error: "Usuário não identificado", success: null })
            }
            usuario.finalizarTokenRecuperacao()
            usuario.setSenha(password)
            return usuario.save().then(() => {
                return res.render('recovery/store', {
                    error: null,
                    success: "Senha alterada com sucesso.",
                    token: null
                })
            }).catch((err) => {
                console.log(err)
                next(err)
            })

        })

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