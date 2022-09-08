import Class_Mongo from "../../DB/Class_Mongo.js"
import error_generator from "../../../Tools/Error_Generator.js"

class UsuarioDaoMongoDb extends Class_Mongo {

    constructor() {
        super('Usuarios')
    }
    async save(NewUser){
        try{
            await super.save(NewUser)
        }
        catch(error){
            throw error
        }
     }

    async deleteById(id){
        try{
            await super.cleanById(id)
        }
        catch(error){
            throw error
        }
     }

    async update(id, datos){
        throw error_generator.NOT_IMPLEMENTED('Metodo update no implemntado para UsuariosMongo')
     }

    async getByName(email){
        let usuarioBuscado = await super.getOne('EMAIL', email)
        return usuarioBuscado
    }

    async getById(id){
        let usuarioBuscado = await super.getOne('_id', id)
        return usuarioBuscado
    }
    async UserExist(datos){
        const productoBuscado = await this.coleccion.find({EMAIL: `${datos.EMAIL}`}).toArray()
        if (productoBuscado.length === 0){
            return false
        } else{
            return true
        }
        
     }
}

export default UsuarioDaoMongoDb