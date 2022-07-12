import express from 'express'
import routerProductos from './Routers/routerProductos.js'
import routerWeb from './Routers/routerWeb.js'
import routerSession from './Routers/routerSessions.js'
import { engine } from 'express-handlebars'
import { Server as Socketserver } from 'socket.io'
import { Server as HttpServer } from 'http'
import eventCnx from './Controllers/socketController.js'
import session from './Middleware/Session.js'
import errorHandler from './Middleware/Error_Handler.js'
import { passportMiddleware, passportSessionHandler } from './Middleware/passport.js'

const app = express()
const httpServer = new HttpServer(app)
const io = new Socketserver(httpServer)
const PORT = 8080


app.use(express.static('Public'))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.use(session)
app.use(passportMiddleware)
app.use(passportSessionHandler)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/productos', routerProductos)
app.use('/api/session', routerSession)
app.use('/', routerWeb)

app.all('*', (req, res) => {
    res.status(404).json({ERROR: `Ruta ${req.url} con el metodo ${req.method} no implementada!`})
})
app.use(errorHandler)

io.on('connection', socket => eventCnx(socket, io))

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando al puerto ${server.address().port}`)
})
