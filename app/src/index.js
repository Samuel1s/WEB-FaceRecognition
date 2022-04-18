// External Imports
import 'dotenv/config'
import express from 'express'

// Internal Imports
import db from './config/db.js'

// Internal Imports - Routes of User.
import userDashRoute from './routes/userDashRoute.js'

// // Internal Imports - Routes of Auth
import loginAuthRoute from './routes/loginAuthRoute.js'
import lfaceAuthRoute from './routes/lfaceAuthRoute.js'

// Internal Imports - Routes of Register
import dataRegisterRoute from './routes/dataRegisterRoute.js'
import faceRegisterRoute from './routes/faceRegisterRoute.js'
import userRegisterRoute from './routes/userRegisterRoute.js'

const __dirname = './src/'
const app = express()

// Middleware - Set static archives - CSS + JS
app.use(express.static(__dirname + 'public'))

// Set Views Engine + Template.
app.set('views', __dirname + 'views')
app.set('view engine', 'pug')

// Config User Routes
userDashRoute(app)
loginAuthRoute(app)
lfaceAuthRoute(app)

// Config Routes of Register
dataRegisterRoute(app)
faceRegisterRoute(app)
userRegisterRoute(app)

// Server Connection 
db.connect().then(() => {
    app.listen(process.env.PORT, () => {
        console.log('servidor online')
    })
})