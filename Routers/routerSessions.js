import { Router } from 'express'
import LoginController from '../Controllers/LoginController.js'

const routerSessions = new Router()

routerSessions.post('/login', LoginController.Login)
routerSessions.get('/logout', LoginController.Logout)


export default routerSessions