
export const UserHasSesion = (req, res, next) => {
    //console.log(res)
    if (req.session?.user?.length > 0) {
        req.session.cookie.originalMaxAge
        next()
    } else {
        res.redirect('/login')
    }
}
