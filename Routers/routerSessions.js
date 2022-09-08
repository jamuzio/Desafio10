import { Router } from 'express'
import UserController from '../Controllers/UserController.js'

const routerSession = new Router()

routerSession.get('/logout', UserController.Logout)
routerSession.post('/register', UserController.registroController)
routerSession.post('/login', UserController.loginController)
routerSession.delete('/:id', UserController.deleteUser)




export default routerSession

