import { MongoClient } from 'mongodb'

const mongodb = {
    cnxStr: 'mongodb+srv://root:MongoPWDRoot@cluster0.l053v.mongodb.net/CoderDesafio9?retryWrites=true&w=majority',
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
