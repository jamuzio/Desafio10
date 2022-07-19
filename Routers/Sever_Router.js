import express from 'express'
import routerProductos from './routerProductos.js'
import routerWeb from './routerWeb.js'
import routerSession from './routerSessions.js'
import routerRandom from './routerRandom.js'
import InfoRouter from './infoRouter.js'


const Server_Router = express()

Server_Router.use('/api/productos', routerProductos)
Server_Router.use('/api/session', routerSession)
Server_Router.use('/api/randoms', routerRandom)
Server_Router.use('/info', InfoRouter)
Server_Router.use('/', routerWeb)
Server_Router.all('*', (req, res) => {
    res.status(404).json({ERROR: `Ruta ${req.url} con el metodo ${req.method} no implementada!`})
})

export default Server_Router
