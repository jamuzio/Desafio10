import passport from 'passport'
import { Strategy } from 'passport-local'
import UsuariosAPI from '../APIs/API_Usuarios.js'
//import { UsuarioDao as usuario } from '../Models/DAOs/Usuarios/index.js'

const usuario = new UsuariosAPI

passport.use('registro', new Strategy({
    passReqToCallback: true,
    usernameField: 'EMAIL',
    passwordField: 'PWD',
},
    async (req, username, password, done) => {
        try {
            const datosUsuario = req.body
            const user = await usuario.createNewUser(datosUsuario)
            done(null, user)
        } catch (error) {
            done(error)
        }
    }))

passport.use('login', new Strategy({
    usernameField: 'EMAIL',
    passwordField: 'PWD',
},
    async (username, password, done) => {
        try {
            const user = await usuario.autenticar(username, password)
            done(null, user)
        } catch (error) {
            done(null, false)
        }
    }))

export const passportMiddleware = passport.initialize()

// opcional =====================================================

passport.serializeUser((user, done) => {
    //console.log(user)
    done(null, user._id)
})

passport.deserializeUser( async (ID, done) => {
    try {
        const user = await usuario.getUserByID(ID)
        done(null, user)
    } catch (error) {
        done(error)
    }
})

export const passportSessionHandler = passport.session()

