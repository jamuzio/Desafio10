import passport from 'passport'
import { Strategy } from 'passport-local'
import API_usuario from '../APIs/API_Usuarios.js'

passport.use('registro', new Strategy({
    passReqToCallback: true,
    usernameField: 'EMAIL',
    passwordField: 'PWD',
},
    async (req, username, password, done) => {
        try {
            const datosUsuario = req.body
            const user = await API_usuario.createNewUser(datosUsuario)
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
            const user = await API_usuario.autenticar(username, password)
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
        const user = await API_usuario.getUserByID(ID)
        done(null, user)
    } catch (error) {
        done(error)
    }
})

export const passportSessionHandler = passport.session()

