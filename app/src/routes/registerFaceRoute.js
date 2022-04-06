import bodyParser from 'body-parser'

const registerFaceRoute = (app) => {
    // Set bodyParser type.
    app.use(bodyParser.urlencoded({ extended: false }))

    app.route('/faceRegister')
    .post(async (req, res) => {
        res.render('faceDetect', { data: req.body }) 
    })
}

export default registerFaceRoute