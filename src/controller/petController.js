const mongoose = require('mongoose')
const Pet = mongoose.model('Pet')

class PetController{
    registrar(req, res, next){
        const {nome, idade, sexo, raca, peso, especie, tutor} = req.body

        if (!nome || !idade || !sexo || !raca || !peso || !especie ||!tutor ) return res.status(422).json({ error: "Preencha todos os campos para o cadastro." })

        const pet = new Pet({nome, idade, sexo, raca, peso, especie, tutor})

        pet.save().then((pet)=> {
            res.json({pet})
        }).catch((err)=>{
            console.log(err)
            next(err)
        })
    }

    getPetId(req, res, next){
        Pet.findById(req.params.id).populate({path: "tutor"}).then((pet)=>{
            if(!pet){
                return res.status(422).json({ error: "Pet não registrado" })
            }
            return res.json({pet})
        }).catch((err)=>{
            console.log(err)
            next(err)
        })
    }

    index(req, res, next){
        Pet.find().then((pets)=>{
            return res.json({pets})
        })
    }

}

/** 
router.post('/cadastrar', async(req, res)=>{
    try {
        const pet = await Pet.create(req.body);
        res.send({pet})
       //await Tutor.create({pet: pet.id})
    } catch (error) {
        res.status(400).send({ error: 'Erro no cadastro de Pets' });
        console.log(error)
    }
});

router.get('/pets', async(req, res)=>{
    try {
       const pets = await Pet.find().populate('tutor', 'nome')
        res.json(pets)
    }catch (error) {
        res.send('Erro ao tentar Selecionar Todos os pets...: ' + error);
        console.log(error)
    }
})
*/
module.exports = PetController;