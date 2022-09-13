import generateID from "../Tools/ID_gen.js"
import error_generator from "../Tools/Error_Generator.js"
import User from "../Models/Class/User.js"
import { UsuarioDao } from "../Models/DAOs/Usuarios/index.js"


class UsuariosAPI {

    constructor() {
        this.usuarios = UsuarioDao
    }
    async createNewUser(datos){
        try{
            if (await this.usuarios.UserExist(datos)){
                throw error_generator.DUPLICATED_USER()
            } else {
                const ID = generateID()
                const usuario = new User({id:ID, email:datos.EMAIL, pwd:datos.PWD})
                await this.usuarios.save(usuario.datosCompletos())
                return usuario.datos()
            }
        }
        catch(error){
            throw error
        }
     }

    async deleteUserById(id){
        try{
            await this.usuarios.deleteById(id)
        }
        catch(error){
            throw error
        }
     }

    async autenticar(username, password) {
        try {
            const datosDeUsuario = await this.usuarios.getByName(username)
            const usuario = new User({id:datosDeUsuario._id, email: datosDeUsuario.EMAIL, pwd:datosDeUsuario.PWD}) 
            if(usuario.authenticate(password)){
                return usuario.datos()
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

    async getUserByID(id){
        let usuarioBuscado = await this.usuarios.getById(id)
        const usuario = new User({id:usuarioBuscado._id, email: usuarioBuscado.EMAIL, pwd:usuarioBuscado.PWD}) 
        return usuario.datos()
    }
}

const API_usuario = new UsuariosAPI

export default API_usuario