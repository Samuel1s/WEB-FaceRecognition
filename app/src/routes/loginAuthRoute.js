import UsersModel from '../model/users.js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import flash from 'connect-flash'

const loginAuthRoute = (app) => {
    // Set bodyParser type.
    app.use(bodyParser.urlencoded({ extended: false }))

    // Set Cookie Parser, Flash & Sessions.
    app.use(cookieParser('SecretStringForCookies'))
    app.use(session({
        secret: 'SecretStringForCookies',
        cookie: { maxAge: 60000 },
        resave: true,
        saveUninitialized: true
    }))
    app.use(flash())

    app.route('/')
    .get(async (req, res) => {
        const error_msg = req.flash('error_msg') // If auth failed
        res.render('loginForm', { error_msg })
    })
    .post(async (req, res) => {
        try {
            const user = await UsersModel.findOne({email: req.body.email, password: req.body.password}).exec()

            if (user !== null) {
                req.session.auth = user // Session created and contains user data.
                res.redirect('/faceAuth') // Redirect per 60 seconds user data with req session.

            } else { 
                req.flash('error_msg', 'Login ou senha incorretos.')
                res.redirect('/')
            }
            
        } catch (error) {
            res.status(400).send({ error: 'Failed to find user - Request Error' + error })
        }
    })
}

export default loginAuthRoute