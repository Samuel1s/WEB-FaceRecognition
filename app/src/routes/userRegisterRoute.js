import UsersModel from '../model/users.js'
import bodyParser from 'body-parser'

const userRegisterRoute = (app) => {
    // Create application/json parser
    app.use(bodyParser.json({ type: 'application/json', limit: '10mb' }))

    app.route('/userRegister')
    .post(async (req, res) => {
        try {
            const user = new UsersModel(req.body)
            await user.save()

            res.status(201).send('Usuário cadastrado')
        } catch (error) {
            res.send(error)
        }
    })
}

export default userRegisterRoute