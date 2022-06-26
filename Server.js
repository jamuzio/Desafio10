import express from 'express'
import routerProductos from './Routers/routerProductos.js'
import routerWeb from './Routers/routerWeb.js'
import { engine } from 'express-handlebars'
import { Server as Socketserver } from 'socket.io'
import { Server as HttpServer } from 'http'
import eventCnx from './Controllers/socketController.js'


const app = express()
const httpServer = new HttpServer(app)
const io = new Socketserver(httpServer)
const PORT = 8080

app.use(express.static('Public'))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/productos', routerProductos)
app.use('/', routerWeb)

io.on('connection', socket => eventCnx(socket, io))

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando al puerto ${server.address().port}`)
})
