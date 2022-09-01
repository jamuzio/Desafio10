import Class_Mongo from "../../Class/Class_Mongo.js"
import error_generator from "../../Tools/Error_Generator.js"
import User from "../../Models/User.js"
import generateID from "../../Tools/ID_gen.js"

class UsuarioDaoMongoDb extends Class_Mongo {

    constructor() {
        super('Usuarios')
    }
    async save(datos){
        try{
            const usuarioBuscado = await this.coleccion.find({EMAIL: `${datos.EMAIL}`}).toArray()
            if (usuarioBuscado.length === 0){
                const ID = generateID()
                const usuario = new User({id:ID, email:datos.EMAIL, pwd:datos.PWD})
                await super.save(usuario.datosCompletos())
                return usuario.datos()
            } else {
                throw error_generator.DUPLICATED_USER()
            }
        }
        catch(error){
            throw error
        }
     }

    async deleteById(id){
        await super.cleanById(id)
     }

    async update(id, datos){
        throw error_generator.NOT_IMPLEMENTED('Metodo update no implemntado para UsuariosMongo')
     }

    async autenticar(username, password) {
        let usuarioBuscado
        try {
            usuarioBuscado = await this.getByName(username)
            if(usuarioBuscado.authenticate(password)){
                return usuarioBuscado.datos()
            } else{
                error_generator.AUTHE_ERROR()
            }
        } catch (error) {
            if(error.tipo === 'NOT_FOUND'){
                throw error_generator.AUTHE_ERROR()
            } else{
                throw error
            }
        }
    }

    async getByName(email){
        let usuarioBuscado = await super.getOne('EMAIL', email)
        console.log(usuarioBuscado)
        const usuario = new User({id:usuarioBuscado._id, email: usuarioBuscado.EMAIL, pwd:usuarioBuscado.PWD}) 
        return usuario
    }

    async getByID(id){
        let usuarioBuscado = await super.getOne('_id', id)
        console.log(usuarioBuscado)
        const usuario = new User({id:usuarioBuscado._id, email: usuarioBuscado.EMAIL, pwd:usuarioBuscado.PWD}) 
        return usuario
    }
}

export default UsuarioDaoMongoDb