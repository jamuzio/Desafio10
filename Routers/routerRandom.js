import { Router } from "express"
import randomController from "../Controllers/randomController.js"

const routerRandom = new Router()

routerRandom.get('/', randomController.getRandoms)

export default routerRandom