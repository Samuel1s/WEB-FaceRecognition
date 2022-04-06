import UsersModel from '../model/users.js'
import bodyParser from 'body-parser'

const registerDataRoute = (app) => {
    // Set bodyParser type.
    app.use(bodyParser.urlencoded({ extended: false }))

    app.route('/register')
    .get(async (req, res) => {
        res.render('registerForm')
    })
    .post(async (req, res) => {
        try {
            const user = new UsersModel(req.body)

            if(user.password !== '') {
                res.redirect(308, '/faceRegister') 
            }

        } catch (error) {
            res.send(error)
        }
    })
}

export default registerDataRoute
