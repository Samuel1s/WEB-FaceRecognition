import 'dotenv/config'
import express from 'express'
import session from 'express-session' 

import db from './config/db.js'
import userRoute from './routes/userRoute.js'
import registerDataRoute from './routes/registerDataRoute.js'
import registerFaceRoute from './routes/registerFaceRoute.js'

const __dirname = './src/'

const app = express()

// Middleware - Set static archives - CSS + JS 
app.use(express.static(__dirname + 'public'))

app.set('views', __dirname + 'views')
app.set('view engine', 'pug')

userRoute(app)
registerDataRoute(app)
registerFaceRoute(app)

app.get('/', (req, res) => res.render('index'))

db.connect().then(() => {
    app.listen(process.env.PORT, () => {
        console.log('servidor online')
    })
})

