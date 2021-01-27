const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const enviarEmailRecovery = require('../helpers/email-forgot');

//alterar para tudo async await
class ResetSenhaController {
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
}

module.exports = ResetSenhaController;