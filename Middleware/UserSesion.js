
export const UserHasSesion = (req, res, next) => {
    //console.log(req)
    if (req.isAuthenticated()) {
        req.session.cookie.originalMaxAge
        next()
    } else {
        res.redirect('/login')
    }
}
