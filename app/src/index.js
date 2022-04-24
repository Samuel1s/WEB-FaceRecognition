// External Imports
import 'dotenv/config'
import express from 'express'
import flash from 'connect-flash'
import session from 'express-session'
import cookieParser from 'cookie-parser'

// Internal Imports
import db from './config/db.js'

// // Internal Imports - Routes of Auth
import loginAuthRoute from './routes/loginAuthRoute.js'
import loggedUserRoute from './routes/loggedUserRoute.js'

// Internal Imports - Routes of Register
import dataRegisterRoute from './routes/dataRegisterRoute.js'
import faceRegisterRoute from './routes/faceRegisterRoute.js'

const __dirname = './src/'
const app = express()

// Middleware - Set static archives - CSS + JS
app.use(express.static(__dirname + 'public'))

// Set Cookie parser, Sessions and Flash.
app.use(cookieParser('SecretStringForCookies'))
app.use(session({ secret: 'SecretStringForCookies', resave: true, saveUninitialized: true }))
app.use(flash())

// Set Views Engine + Template.
app.set('views', __dirname + 'views')
app.set('view engine', 'pug')

// Config User Routes
loginAuthRoute(app)
loggedUserRoute(app)

// Config Routes of Register
dataRegisterRoute(app)
faceRegisterRoute(app)

// Server Connection 
db.connect().then(() => {
    app.listen(process.env.PORT, () => {
        console.log('servidor online')
    })
})