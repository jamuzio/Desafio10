import { puerto, modo}  from './Config/Yargs_config.js'
import OpenServer from './src/Server.js'
import CreateCluster from './src/Cluster.js'

const PORT = process.env.PORT || 8080
puerto = PORT

switch(modo){
    case 'f':
    case 'fork':
        OpenServer(puerto)
        break
    case 'c':
    case 'cluster':
        CreateCluster(puerto)
        break
    default:
        const error = new Error("Parametro MODO pasado con parametro incorrecto. Usar fork o cluster")
        throw error
}