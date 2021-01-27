const mongoose = require('mongoose')
const Usuario = mongoose.model('Usuario')

class SessionController {

  //autenticar usuário
  async auth(req, res, next) {
    const { email, password } = req.body

    try {
      if (!email) {
        return res.status(422).json({ error: "E-mail não pode ser vazio" })
      }
      if (!password) {
        return res.status(422).json({ error: "A senha não pode ser vazia" })
      }

      const user = await Usuario.findOne({ email })

      if (!user) return res.status(401).json({ error: "Usuário não registrado" })

      if (user.status === "inativo") return res.status(401).json({ error: "Falha na autenticação" })

      if (!user.validarSenha(password)) {
        return res.status(401).json({ error: "Senha inválida" })
      }

      res.json({
        usuario: user.enviarAuthJson()

      });
    } catch (error) {
      next(error);
    }
  }

  //retonar usuário autenticado
  async indexAuth(req, res, next) {
    try {
      const user = await Usuario.findById(req.payload.id)
      if (!user) {
        return res.status(401).json({ error: "Usuário não registrado" })
      }
      res.json({ user: user.enviarAuthJson() })

    } catch (error) {
      next(error)
    }

  }


}

module.exports = SessionController;