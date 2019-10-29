const mongoose = require('mongoose')
const Usuario = mongoose.model('Usuario')
const enviarEmailRecovery = require('../helpers/email-forgot')

class UsuarioController {
    registrar(req, res, next) {
        const { nome, email, password, } = req.body;

        if (!nome || !email || !password) return res.status(422).json({ error: "Preencha todos os campos para o cadastro." })

        const usuario = new Usuario({ nome, email, password })
        usuario.setSenha(password)

        usuario.save().then((usuario) => {
            res.json({ usuario: usuario.enviarAuthJson() })
        }).catch((err) => {
            console.log(err)
            next(err)
        })
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
            if (!usuario.validarSenha(password)) {
                return res.status(401).json({ error: "Senha inválida" })
            }
            res.json({
                usuario: usuario.enviarAuthJson()

            });
            console.log(usuario.id)


        }).catch((err) => {
            console.log(err)
            next(err)
        })

    }

    update(req, res, next) {
        const { nome, email, password } = req.body;

        Usuario.findById(req.payload.id).then(usuario => {
            if (!usuario) {
                return res.status(401).json({ error: "Usuário não registrado" })
            }
            if (typeof nome !== 'undefined') usuario.nome = nome;
            if (typeof email !== 'undefined') usuario.email = email;
            if (typeof password !== 'undefined') usuario.setSenha(password);
            usuario.save()
                .then(() => {
                    return res.json({
                        usuario: usuario.enviarAuthJson()
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
            }).catch((err)=>{
                console.log(err)
                next(err)
            })

        })

    }
}


//alterar usuário
//listar todos usuários
//inativar usuário

//validar usuário
//verificar permissões usuario
module.exports = UsuarioController;