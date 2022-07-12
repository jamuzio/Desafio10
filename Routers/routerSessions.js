import { Router } from 'express'
import {UserLoginStateController, registroController, loginController} from '../Controllers/UserController.js'

const routerSession = new Router()

routerSession.get('/logout', UserLoginStateController.Logout)
routerSession.post('/register', registroController)
routerSession.post('/login', loginController)




export default routerSession

