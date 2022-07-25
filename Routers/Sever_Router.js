import express from 'express'
import routerProductos from './routerProductos.js'
import routerWeb from './routerWeb.js'
import routerSession from './routerSessions.js'
import routerRandom from './routerRandom.js'
import InfoRouter from './infoRouter.js'
import Routes_logger from '../Middleware/Routes_logger.js'
import logger from '../Tools/logger.js'


const Server_Router = express()

Server_Router.use('/api/productos', Routes_logger, routerProductos)
Server_Router.use('/api/session', Routes_logger, routerSession)
Server_Router.use('/api/randoms', Routes_logger, routerRandom)
Server_Router.use('/info', Routes_logger, InfoRouter)
Server_Router.use('/', Routes_logger, routerWeb)
Server_Router.all('*', (req, res) => {
    logger.warn(`Ruta ${req.url} con el metodo ${req.method} no implementada!`)
    res.status(404).json({ERROR: `Ruta ${req.url} con el metodo ${req.method} no implementada!`})
})

export default Server_Router
