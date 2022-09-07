import bodyParser from 'body-parser'
import { showUserFaceRegisterInterface, updateAndSaveUserFace } from '../controller/registerController.js'


const faceRegisterRoute = (app) => {
    // Set bodyParser type.
    app.use(bodyParser.raw({ type: 'application/octet-stream', limit: '400kb' }))
    
    // Route to register user face.
    app.route('/faceRegister/:id?')
    .get(showUserFaceRegisterInterface)
    .put(updateAndSaveUserFace)
}

export default faceRegisterRoute