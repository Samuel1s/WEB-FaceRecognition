import UsersModel from '../model/users.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import bodyParser from 'body-parser'
import flash from 'connect-flash'

const loginAuthRoute = (app) => {
    // Set bodyParser type.
    app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }))
 
    // Set Sessions to use Flash.
    app.use(cookieParser('SecretStringForCookies'))
    app.use(session({ secret: 'SecretStringForCookies', resave: true, saveUninitialized: true }))
    app.use(flash())

    app.route('/')
    .get(async (req, res) => {
        const error_msg = req.flash('error_msg') // If auth failed.
        res.render('loginForm', { error_msg })
    })
    .post(async (req, res) => {
        try {
            const query = {
                email: req.body.email, 
                password: req.body.password
            }

            const user = await UsersModel.findOne(query).exec()
            if (user !== null) {
                res.render('loginFace', { 
                    data: user, 
                    LOCAL_URL: process.env.LOCAL_URL, 
                    API_URL: process.env.API_URL, 
                    KEY: process.env.KEY
                }) 

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