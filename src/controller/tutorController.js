const mongoose = require('mongoose')
const Tutor = mongoose.model('Tutor')

class TutorController {
    registrar(req, res, next) {
        const tutor = req.body;

        /** 
        tutor.array.forEach(element => {
            if (element === undefined || element === null || element === "") {
                res.status(422).json({
                    error: "Preencha todos os campos para o cadastro."
                })
            }
        });
        */
        console.log(tutor)

        const tutorDao = new Tutor(tutor)

        tutorDao.save().then((tutorDao) => {
            res.json({ tutorDao })
        }).catch((err) => {
            console.log(err)
            next(err)
        })
    }

    getTutorId(req, res, next) {
        Tutor.findById(req.params.id).then((tutor) => {
            if (!tutor) {
                return res.status(422).json({ error: "Pet não registrado" })
            }
            return res.json({ tutor })
        }).catch(next)
    }

}

module.exports = TutorController;