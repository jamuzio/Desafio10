

const LoginController = {
    Login: (req, res) => {
        const NewUser = req.body
        if(NewUser.user?.length > 0){
            req.session.user = NewUser.user
            res.status(200).redirect('/')
        }
        else{
            res.status(400).redirect('/login?badLogin=true')
        }
    },
    Logout: (req, res) => {
        req.session.destroy(err => {
            if (!err) res.status(200).redirect('/login')
            else res.send({ status: 'Logout ERROR', body: err })
        })
    }
}

export default LoginController