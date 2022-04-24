import UsersModel from '../model/users.js'
import bodyParser from 'body-parser'

const faceRegisterRoute = (app) => {
    // Set bodyParser type.
    app.use(bodyParser.raw({ type: 'application/octet-stream', limit: '400kb' }))
    
    // Route to register user face.
    app.route('/faceRegister/:id?')
    .get(async (req, res) => {
        const context = req.cookies['context']
        
        return res.render('registerFace', { 
            data: context, 
            LOCAL_URL: process.env.LOCAL_URL, API_URL: process.env.API_URL, KEY: process.env.KEY 
        }) 
    })
    .put(async (req, res) => {
        const { id } = req.params

        if (!id) {
            return res.status(400).send({ error: 'Users id is missing.' })
        }

        try {
            const updatedUser = await UsersModel.findOneAndUpdate({ _id: id }, { userImage: req.body }, { new: true })

            if (updatedUser) {
                req.flash('success_msg', 'Usuário cadastrado.')

                return res.status(200).json({ redirect: '/login'})
            }

            return res.status(400).send({ error: 'Could not update the user.' })

        } catch (error) {
            res.send(error)
        }
    })
}

export default faceRegisterRoute