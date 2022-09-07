import UsersModel from '../model/users.js'

let n_attempts = 0

const authUserError = (req, res) => {
    req.flash('error_msg', 'Usuário não identificado, houve 3 tentativas e todas falharam!')
    return res.status(200).json({ redirect: '/' })
}

const numberOfAttempts = () => {
    return n_attempts < 3 ? n_attempts += 1 : n_attempts = 0
}

export const showLoginForm = async (req, res) => {
    const error_msg = req.flash('error_msg') 
    const success_msg = req.flash('success_msg')

    return res.render('loginForm', { error_msg: error_msg, success_msg: success_msg })
}

export const showUserDashboard = async (req, res) => {
    const user_data = req.flash('user_data')
    
    return res.render('userProfile', { data: user_data.pop()})
}

export const authUserFace = async (req, res) => {
    const { confidence } = req.body
    
    if (confidence) {
        return confidence > 0.7 
        ? 
            res.status(200).json({ redirect: '/home' })
        :
            numberOfAttempts() < 3
            ?
                res.status(200).json({ log_error_msg: `Tentativa ${n_attempts + 1}, Usuário não identificado.` })
            :
                authUserError(req, res)

    } else {
        const { email, password } = req.body

        try {
            const user = await UsersModel.findOne({ email: email,  password: password }).exec()
            
            if (user !== null) {
                req.flash('user_data', user)// To send user data.
                return res.render('loginFace', 
                {   
                    data: user, LOCAL_URL: process.env.LOCAL_URL,
                    API_URL: process.env.API_URL, KEY: process.env.KEY
                }) 

            } else { 
                req.flash('error_msg', 'Login ou senha incorretos.')
                return res.redirect('/')
            }
                
        } catch (error) {
            return res.status(400).send({ error: 'Failed to find user - Request Error' + error })
        }
    }
}