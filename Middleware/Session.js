import expressSession from 'express-session'
import MongoStore from 'connect-mongo'

const MONGOATLAS = process.env.MONGOATLAS
const SECRETWORD = process.env.SECRETWORD

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

let session
switch(process.env.MODO_PERSISTENCIA){
    case'mongodb':
        session = expressSession({
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
        break
    default:
        session = expressSession({
                secret: SECRETWORD,
                resave: false,
                saveUninitialized: false,
                cookie: {
                    maxAge: 600000
                }
    })
}

export default session