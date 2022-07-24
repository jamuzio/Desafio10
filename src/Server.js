import {env_config} from '../Env/dotenv_config.js'
import express from 'express'
import Server_Router from '../Routers/Sever_Router.js'
import { engine } from 'express-handlebars'
import { Server as Socketserver } from 'socket.io'
import { Server as HttpServer } from 'http'
import eventCnx from '../Controllers/socketController.js'
import session from '../Middleware/Session.js'
import errorHandler from '../Middleware/Error_Handler.js'
import { passportMiddleware, passportSessionHandler } from '../Middleware/passport.js'




const app = express()
const httpServer = new HttpServer(app)
const io = new Socketserver(httpServer)


app.use(express.static('Public'))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.use(session)
app.use(passportMiddleware)
app.use(passportSessionHandler)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(Server_Router)

app.use(errorHandler)

io.on('connection', socket => eventCnx(socket, io))

export default function OpenServer(PORT){
    httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando al puerto ${PORT} desde el proceso ${process.pid}`)
})
}