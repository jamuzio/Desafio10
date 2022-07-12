import passport from 'passport'


const UserLoginStateController = {
    Logout: (req, res, next) => {
        if (req.isAuthenticated()) {
            req.logout((error) =>{
                if (err) { return next(error); }
            })
        }
        res.status(200).redirect('/login')
    },
    failLogin: (req, res) => {
        res.status(401).render('FailLogin')
    },
    successRegister: (req, res) => {
        res.json(req.user)
    },
    failRegister: (req, res) => {
        res.status(400).render('FailRegister')
    },
    successLogin: (req, res) => {
        console.log(req.user)
        res.json({ msg: 'ok' })
    }
}

export { UserLoginStateController }


export const registroController = passport.authenticate('registro', {
    successRedirect: '/login',
    failureRedirect: '/api/session/failRegister',
})

export const loginController = passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/api/session/failLogin',
})



