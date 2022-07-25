import { Router } from "express"
import os from 'os'
import compression from 'compression'

const InfoRouter = new Router()

const getInfo = (req, res) => {
    const Sysinfo = {
        "Argumentos de entrada": process.argv.slice(2),
        "Nombre de la plataforma": process.platform,
        "Versión de node.js": process.version,
        "Memoria total reservada": process.memoryUsage().rss,
        "Path de ejecución": process.execPath,
        "Process id": process.pid,
        "Carpeta del proyecto": process.cwd(),
        "Cantidad de Procesadores": os.cpus().length
    }
    if(req.query?.consolelog) console.log(Sysinfo)
    res.status(200).json(Sysinfo)
}

InfoRouter.get('/', getInfo )
InfoRouter.get('/con-compresion', compression(), getInfo )

export default InfoRouter

