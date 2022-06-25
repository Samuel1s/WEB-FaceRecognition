import UsersModel from '../model/users.js'
import bodyParser from 'body-parser'

const loginAuthRoute = (app) => {
    // Control variables.
    let n_attempts = 1 // Count the number of attempts to login.

    // Set bodyParser type.
    app.use(bodyParser.urlencoded({ extended: false })) // To login form.
    app.use(bodyParser.json()) // To face auth data.

    // Route to set login credentials.
    app.route('/login')
    .get(async (req, res) => {
        const error_msg = req.flash('error_msg') 
        const success_msg = req.flash('success_msg')

        return res.render('loginForm', { error_msg: error_msg, success_msg: success_msg })
    })
    .post(async (req, res) => {
        const { isIdentical, confidence } = req.body

        if (typeof isIdentical !== 'undefined') { // Returns true without throwing errors.
            console.log('Confiança:' + confidence)
            if (isIdentical && confidence > 0.6) {
                return res.status(200).json({ redirect: '/home' })
            } else {
                if (n_attempts < 3) {
                    n_attempts += 1
                    return res.status(200).json({ log_error_msg: 'Usuário não identificado. Face incorreta.' })
                } else {
                    n_attempts = 1
                    req.flash('error_msg', 'Usuário não identificado, houve 3 tentativas e todas falharam!')
                    return res.status(200).json({ redirect: '/login' })
                }
            }
        } else {
            try {
                const { email, password } = req.body
                const query = { email: email,  password: password }
                const user = await UsersModel.findOne(query).exec()

                if (user !== null) {
                    req.flash('user_data', user)// To send user data.

                    return res.render('loginFace', 
                    {   
                        data: user, 
                        LOCAL_URL: process.env.LOCAL_URL, API_URL: process.env.API_URL, KEY: process.env.KEY
                    }) 
    
                } else { 
                    req.flash('error_msg', 'Login ou senha incorretos.')
                    return res.redirect('/login')
                }
                    
            } catch (error) {
                return res.status(400).send({ error: 'Failed to find user - Request Error' + error })
            }
        }
    })
}

export default loginAuthRoute