import Class_MEM from "../../DB/Class_MEM.js"
import Message from "../../Class/Message.js"
import generateID from "../../../Tools/ID_gen.js"

class MensajesDaoMem extends Class_MEM {
    save(datos){
        try{
            const ID = generateID()
            const mensaje = new Message({id:ID, email:datos.EMAIL, nombre:datos.NOMBRE, apellido:datos.APELLIDO, edad:datos.EDAD, avatar:datos.AVATAR, texto:datos.TEXTO})
            super.save(mensaje.datos())
            return ID
        }
        catch(error){
            throw error
        }
    }
    
}

export default MensajesDaoMem
