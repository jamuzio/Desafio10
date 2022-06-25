import Class_Mongo from "../../Class/Class_Mongo.js"

class MensajesDaoMongoDb extends Class_Mongo {

    constructor() {
        super('Mensajes')
    }
    async save(datos){
       return await super.save(datos, 'Mensajes')
    }
    
}

export default MensajesDaoMongoDb
