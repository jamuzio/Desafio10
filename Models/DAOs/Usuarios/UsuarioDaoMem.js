import Class_MEM from "../../DB/Class_MEM.js"
import error_generator from "../../../Tools/Error_Generator.js"
import User from "../../Class/User.js"
import generateID from "../../../Tools/ID_gen.js"

class UsuarioDaoMem extends Class_MEM {
    save(datos){
        try{
            const usuarioBuscado = this.Objects.find( u => u.EMAIL == datos.EMAIL)
            if (!usuarioBuscado){
                const ID = generateID()
                const usuario = new User({id:ID, email:datos.EMAIL, pwd:datos.PWD})
                super.save(usuario.datosCompletos())
                return usuario.datos()
            } else {
                throw error_generator.DUPLICATED_USER()
            }
        }
        catch(error){
            throw error
        }
     }

    deleteById(id){
        super.cleanById(id)
     }

    update(id, datos){
        throw error_generator.NOT_IMPLEMENTED('Metodo update no implemntado para UsuariosMongo')
     }

    autenticar(username, password) {
        let usuarioBuscado
        try {
            usuarioBuscado = this.getByName(username)
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

    UserExist(datos){
        const productoBuscado = this.Objects.find(p => p.EMAIL == datos.EMAIL)
        if (!productoBuscado){
            return false
        } else{
            return true
        }
    }
    getByName(email){
        let usuarioBuscado = super.getOne('EMAIL', email)
        //console.log(usuarioBuscado)
        const usuario = new User({id:usuarioBuscado._id, email: usuarioBuscado.EMAIL, pwd:usuarioBuscado.PWD}) 
        return usuario
    }

    getByID(id){
        let usuarioBuscado = super.getOne('_id', id)
        //console.log(usuarioBuscado)
        const usuario = new User({id:usuarioBuscado._id, email: usuarioBuscado.EMAIL, pwd:usuarioBuscado.PWD}) 
        return usuario
    }
}

export default UsuarioDaoMem