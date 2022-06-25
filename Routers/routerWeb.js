import express from 'express'
import { WebController } from '../Controllers/WebController.js'

const routerWeb = express.Router()


routerWeb.get('/', WebController.AddNewProd)
routerWeb.get('/productos', WebController.ProdDisplay)
routerWeb.get('/productos-test', WebController.TestProdDisplay)

export default routerWeb 