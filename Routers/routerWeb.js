import express from 'express'
import { WebController } from '../Controllers/WebController.js'
import { UserHasSesion } from '../Middleware/UserSesion.js'

const routerWeb = express.Router()


routerWeb.get('/', UserHasSesion ,WebController.AddNewProd)
routerWeb.get('/productos', UserHasSesion, WebController.ProdDisplay)
routerWeb.get('/productos-test', UserHasSesion, WebController.TestProdDisplay)
routerWeb.get('/login', WebController.Login)
routerWeb.get('/logout', WebController.Logout)
routerWeb.get('/registro', WebController.Registro)

export default routerWeb 