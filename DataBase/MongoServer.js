import { MongoClient } from 'mongodb'
import { MONGOATLAS } from '../Secure/Config.js'

const mongodb = {
    cnxStr: MONGOATLAS,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000
    }
}

const client = new MongoClient(mongodb.cnxStr, mongodb.options)
let dbDesafio9
try{
    await client.connect()
    dbDesafio9 = client.db("CoderDesafio9")
}
catch(error){
    console.log(error)
    throw error
}
export default dbDesafio9
