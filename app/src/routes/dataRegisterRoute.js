import UsersModel from '../model/users.js'
import bodyParser from 'body-parser'

const dataRegisterRoute = (app) => {
    // Set bodyParser type.
    app.use(bodyParser.urlencoded({ extended: false }))

    app.route('/dataRegister')
    .get(async (req, res) => {
        res.render('registerForm')
    })
    .post(async (req, res) => {
        try {
            const user = new UsersModel(req.body)

            if(user.password !== '') {
                res.redirect(307, '/faceRegister') // 307 Temporary Redirect, Same Req with user data getted.
            }

        } catch (error) {
            res.send(error)
        }
    })
}

export default dataRegisterRoute
