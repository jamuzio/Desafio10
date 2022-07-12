import passport from 'passport'


const UserLoginStateController = {
    Logout: (req, res, next) => {
        if (req.isAuthenticated()) {
            req.logout((error) =>{
                if (error) { return next(error); }
            })
        }
        res.status(200).redirect('/login')
    }
}

export { UserLoginStateController }


export const registroController = passport.authenticate('registro', {
    successRedirect: '/login',
    failureRedirect: '/failRegister',
})

export const loginController = passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/failLogin',
})



