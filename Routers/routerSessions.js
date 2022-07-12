import { Router } from 'express'
import {UserLoginStateController, registroController, loginController} from '../Controllers/UserController.js'

const routerSession = new Router()

routerSession.get('/logout', UserLoginStateController.Logout)
routerSession.post('/register', registroController)
routerSession.post('/successRegister', UserLoginStateController.successRegister)
routerSession.get('/failRegister', UserLoginStateController.failRegister)

// login
routerSession.post('/login', loginController)
routerSession.post('/successLogin', UserLoginStateController.successLogin)
routerSession.get('/failLogin', UserLoginStateController.failLogin)



export default routerSession

