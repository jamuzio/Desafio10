import { Router } from "express"
import os from 'os'

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
    res.status(200).json(Sysinfo)
}

InfoRouter.get('/', getInfo )

export default InfoRouter

