import bodyParser from 'body-parser'
import { showLoginForm, authUserFace } from '../controller/userController.js'

const loginAuthRoute = (app) => {
    // Set bodyParser type.
    app.use(bodyParser.urlencoded({ extended: false })) // To login form.
    app.use(bodyParser.json()) // To face auth data.

    // Route to set login credentials.
    app.route('/')
    .get(showLoginForm)
    .post(authUserFace)
}

export default loginAuthRoute