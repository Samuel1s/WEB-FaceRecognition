import bodyParser from 'body-parser'

const loggedUserRoute = (app) => {
    // Set bodyParser type.
    app.use(bodyParser.urlencoded({ extended: false }))

    app.route('/home')
    .get(async (req, res) => {
        const user_data = req.flash('user_data') 

        return res.render('userProfile', { data: user_data[0] })
    })
}

export default loggedUserRoute