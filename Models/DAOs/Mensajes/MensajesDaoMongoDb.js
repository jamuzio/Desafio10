import Class_Mongo from "../../DB/Class_Mongo.js"
import Message from "../../Class/Message.js"
import generateID from "../../../Tools/ID_gen.js"

class MensajesDaoMongoDb extends Class_Mongo {

    constructor() {
        super('Mensajes')
    }
    async save(datos){
        try{
            const ID = generateID()
            const mensaje = new Message({id:ID, email:datos.EMAIL, nombre:datos.NOMBRE, apellido:datos.APELLIDO, edad:datos.EDAD, avatar:datos.AVATAR, texto:datos.TEXTO})
            await super.save(mensaje.datos())
            return ID
        }
        catch(error){
            throw error
        }

    }
    
}

export default MensajesDaoMongoDb
