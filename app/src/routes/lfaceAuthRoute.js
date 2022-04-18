import bodyParser from 'body-parser'
import session from 'express-session'
//import cookieParser from 'cookie-parser'
//import session from 'express-session'
//import flash from 'connect-flash'

const rfaceAuthRoute = (app) => {
    // Set bodyParser type.
    app.use(bodyParser.urlencoded({ extended: false, limit: '10mb'}))

    // Set Cookie Parser, Flash & Sessions.
    /*app.use(cookieParser('SecretStringForCookies'))
    app.use(session({
        secret: 'SecretStringForCookies',
        cookie: { maxAge: 60000 },
        resave: true,
        saveUninitialized: true
    }))*/
    
    app.route('/faceAuth')
    .get(async (req, res) => {
        if(data)
            console.log(data)
            res.send(data) 
    })
}

export default rfaceAuthRoute