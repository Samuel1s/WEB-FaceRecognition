import bodyParser from 'body-parser'
import { showUserDataRegisterForm, saveUserData } from '../controller/registerController.js'

const dataRegisterRoute = (app) => {
    // Set bodyParser type.
    app.use(bodyParser.urlencoded({ extended: false }))

    // Route to register user data.
    app.route('/dataRegister')
    .get(showUserDataRegisterForm)
    .post(saveUserData)
}

export default dataRegisterRoute
