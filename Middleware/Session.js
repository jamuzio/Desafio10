import expressSession from 'express-session'
import MongoStore from 'connect-mongo'
import { MONGOATLAS, SECRETWORD } from '../Secure/Config.js'

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

const session = expressSession({
    store: MongoStore.create({
        mongoUrl: MONGOATLAS,
        mongoOptions: advancedOptions
    }),

    secret: SECRETWORD,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000
    }
})

export default session