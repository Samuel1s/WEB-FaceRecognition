import bodyParser from 'body-parser'

const faceRegisterRoute = (app) => {
    // Set bodyParser type.
    app.use(bodyParser.urlencoded({ extended: false }))

    app.route('/faceRegister')
    .post(async (req, res) => {
        res.render('registerFace', { 
            data: req.body, 
            LOCAL_URL: process.env.LOCAL_URL, 
            API_URL: process.env.API_URL, 
            KEY: process.env.KEY
        }) 
    })
}

export default faceRegisterRoute