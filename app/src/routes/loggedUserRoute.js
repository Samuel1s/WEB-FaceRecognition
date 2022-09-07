import bodyParser from 'body-parser'
import { showUserDashboard } from '../controller/userController.js'

const loggedUserRoute = (app) => {
    // Set bodyParser type.
    app.use(bodyParser.urlencoded({ extended: false }))

    app.route('/home')
    .get(showUserDashboard)
}

export default loggedUserRoute