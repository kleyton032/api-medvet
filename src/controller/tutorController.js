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
}

/*
router.get('/tutores/:tutor_id', async (req, res)=>{
    try {
       //Fazendo uma consulta no banco de dados
        const tutor = await Tutor.findById(req.params.tutor_id)
         //Realizando consulta na tabela pets e retornando o tutor vinculado a ela.
        const pets = await Pet.find({tutor:req.params.tutor_id})
        res.json({
            tutor, 
            pets
        })
    } catch (error) {
        res.send('Erro ao tentar Selecionar Todos os usuários...: ' + error);
        console.log(error)
    }
 }); 

 */

module.exports = TutorController;