import Class_Mongo from "../../Class/Class_Mongo.js"
import bCrypt from "bcrypt"
import error_generator from "../../Tools/Error_Generator.js"

class UsuarioDaoMongoDb extends Class_Mongo {

    constructor() {
        super('Usuarios')
    }
    async save(datos){
        try{
            if(datos.EMAIL?.length === 0 || 
                !emailRegex.test(datos.EMAIL) ||
                datos.PWD?.length === 0 ){
                    throw error_generator.MISSING_DATA()
                }
            datos.PWD = createHash(datos.PWD)
            const newuser = await super.save(datos, 'Usuario')
            return {EMAIL:newuser.EMAIL, ID:newuser.ID}
        }
        catch(error){
            throw error
        }
     }
    async deleteById(id){
         await super.cleanById(id, 'Usuario')
     }
    async update(id, datos){
        return await super.update(id, datos, 'Usuario')
     }
    async autenticar(username, password) {
        let usuarioBuscado
        try {
            usuarioBuscado = await this.getByName(username)
        } catch (error) {
            if(error.tipo === 'NOT_FOUND'){
                throw error_generator.AUTHE_ERROR()
            } else{
                throw error
            }
        }
        if (bCrypt.compareSync(password, usuarioBuscado.PWD)) {
            return usuarioBuscado
        }else throw error_generator.AUTHE_ERROR()
        
    }
    async getByName(Name){
        const ElementoBuscado = await super.getByName(Name, 'Usuario')
        return {ID: ElementoBuscado._id.toString() ,EMAIL: ElementoBuscado.EMAIL, PWD: ElementoBuscado.PWD}
    }
    async getByID(Name){
        const ElementoBuscado = await super.getByID(Name, 'Usuario')
        return {ID: ElementoBuscado._id.toString() ,EMAIL: ElementoBuscado.EMAIL}
    }
}

export default UsuarioDaoMongoDb

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

  const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
