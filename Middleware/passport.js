import passport from 'passport'
import { Strategy } from 'passport-local'
import { UsuarioDao as usuario } from '../DAOs/Usuarios/index.js'


passport.use('registro', new Strategy({
    passReqToCallback: true,
    usernameField: 'EMAIL',
    passwordField: 'PWD',
},
    async (req, username, password, done) => {
        try {
            const datosUsuario = req.body
            const user = await usuario.save(datosUsuario)
            done(null, user)
        } catch (error) {
            if (error.tipo === 'DUPLICATED_USER' || error.tipo === 'MISSING_DATA' ){
                done(null, false)
            } else{
                done(error)
            }
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
        const usuarioBuscado = await usuario.getByID(ID)
        const user = usuarioBuscado.datos()
        done(null, user)
    } catch (error) {
        done(error)
    }
})

export const passportSessionHandler = passport.session()

