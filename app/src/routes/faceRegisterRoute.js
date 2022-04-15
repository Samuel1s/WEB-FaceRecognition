import bodyParser from 'body-parser'

const faceRegisterRoute = (app) => {
    // Set bodyParser type.
    app.use(bodyParser.urlencoded({ extended: false }))

    app.route('/faceRegister')
    .post(async (req, res) => {
        res.render('registerFace', { data: req.body }) 
    })
}

export default faceRegisterRoute