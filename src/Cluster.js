import cluster from 'cluster'
import os from 'os'
import OpenServer from './Server.js'

const numCPUs = os.cpus().length

export default function CreateCluster(PORT){
    if (cluster.isPrimary) {
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork()
        }
    
        cluster.on('exit', (worker, code, signal) => {
            console.log(`Worker ${worker.process.pid} died`)
            cluster.fork()
        })
    } else {
        OpenServer(PORT)
    }
}
