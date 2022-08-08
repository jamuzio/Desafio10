import { puerto, modo}  from './Config/Yargs_config.js'
import OpenServer from './src/Server.js'
import CreateCluster from './src/Cluster.js'

const PORT = process.env.PORT || 8080

switch(modo){
    case 'f':
    case 'fork':
        OpenServer(PORT)
        break
    case 'c':
    case 'cluster':
        CreateCluster(PORT)
        break
    default:
        const error = new Error("Parametro MODO pasado con parametro incorrecto. Usar fork o cluster")
        throw error
}