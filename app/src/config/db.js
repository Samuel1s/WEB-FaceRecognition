import mongoose from 'mongoose'

mongoose.Promise = global.Promise

const config = {
    uri: process.env.DB_CONNECTION,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
}

mongoose.connection.on('open', () => {
    console.log('Successfully connected to database. ')
})

mongoose.connection.on('error', (err) => {
    throw new Error(`Could not connect to MongoDB. ${err} `)
})

export default {
    connect: () => mongoose.connect(config.uri, config.options)
}