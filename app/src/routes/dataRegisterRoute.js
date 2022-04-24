import UsersModel from '../model/users.js'
import bodyParser from 'body-parser'

const dataRegisterRoute = (app) => {
    // Set bodyParser type.
    app.use(bodyParser.urlencoded({ extended: false }))

    // Route to register user data.
    app.route('/dataRegister')
    .get(async (req, res) => {
        const error_msg = req.flash('error_msg') 

        return res.render('registerForm', { error_msg })
    })

    .post(async (req, res) => {
        try {
            const user = new UsersModel(req.body)
            const save = await user.save()
           
            if(save) {
                res.cookie('context', save, { httpOnly: true })
                return res.redirect('/faceRegister') 
            }

        } catch (error) {
            req.flash('error_msg', 'Email já em uso, tente outro.')
            return res.redirect('/dataRegister')
        }
    })
}

export default dataRegisterRoute
