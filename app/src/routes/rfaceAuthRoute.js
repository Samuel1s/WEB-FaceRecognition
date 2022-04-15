import bodyParser from 'body-parser'

const rfaceAuthRoute = (app) => {
    // Set bodyParser type.
    app.use(bodyParser.urlencoded({ extended: false }))

    app.route('/faceAuth')
    .get(async (req, res) => {
        if(req.session)
            res.render('loginFace', { data: req.session.auth }) 
    })
}

export default rfaceAuthRoute