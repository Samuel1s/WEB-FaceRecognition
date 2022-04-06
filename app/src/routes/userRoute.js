import UsersModel from '../model/users.js'
import bodyParser from 'body-parser'

const userRoute = (app) => {
    // Set bodyParser type.
    app.use(bodyParser.json({ type: 'application/json' }))

    app.route('/users/:id?')
    .get(async (req,res) => {
        const { id } = req.params
        const query = {};

        if (id) {
            query._id = id
        }

        try {
            const users = await UsersModel.find(query)
            res.send({ users })
        } catch (error) {
            res.status(400).send({ error: 'Failed to find user.' })
        }
    })
    .post(async (req, res) => {
        try {
            const user = new UsersModel(req.body)
            console.log(user)
            //await user.save()

            res.status(201).send('Usuário cadastrado')
        } catch (error) {
            res.send(error)
        }
    })
    .put(async (req, res) => {
        const { id } = req.params

        if (!id) {
            return res.status(400).send({ error: 'Users ID is missing.' })
        }

        try {
            const updatedUser = await UsersModel.findOneAndUpdate({ _id: id }. req.body, {
                new: true
            })

            console.log(updatedUser)

            if (updatedUser) {
                return res.status(200).send('OK')
            }

            return res.status(400).send({ error: 'Could not update the user.' })

        } catch (error) {
            res.send(error)
        }
    })
    .delete(async (req, res) => {
        const { id } = req.params

        if (!id) {
            return res.status(400).send({ error: 'Users ID is missing.' })
        }
        try {
            const deleteUser = await UsersModel.deleteOne({ _id: id })

            if (deleteUser.deletedCount) {
                return res.send('OK')
            }

            return res.status(400).send({ error: 'Could not delete the user.' })


        } catch (error) {
            res.send(error)
        }
    })
}

export default userRoute