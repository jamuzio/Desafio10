import passport from 'passport'


const UserController = {
    Logout: (req, res, next) => {
        if (req.isAuthenticated()) {
            req.logout((error) =>{
                if (error) { return next(error); }
            })
        }
        res.status(200).redirect('/login')
    },
    registroController: passport.authenticate('registro', {
        successRedirect: '/login',
        failureRedirect: '/failRegister',
    }), 
    loginController: passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/failLogin',
    })

}

export default UserController



