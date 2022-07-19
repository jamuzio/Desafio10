import express from 'express'
import routerProductos from './routerProductos.js'
import routerWeb from './routerWeb.js'
import routerSession from './routerSessions.js'

const Server_Router = express()

Server_Router.use('/api/productos', routerProductos)
Server_Router.use('/api/session', routerSession)
//app.use('/api/randoms', routerSession)
//app.use('/info', routerWeb)
Server_Router.use('/', routerWeb)
Server_Router.all('*', (req, res) => {
    res.status(404).json({ERROR: `Ruta ${req.url} con el metodo ${req.method} no implementada!`})
})

export default Server_Router
