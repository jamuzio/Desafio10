import dbDesafio9 from "../DataBase/MongoServer.js"
import error_generator from "../Tools/Error_Generator.js"


class Class_Mongo {
    constructor (coleccion){
        this.coleccion = dbDesafio9.collection(coleccion)
    }
    async save(NewElement){
        try{
            return await this.coleccion.insertOne(NewElement)
        }
        catch(error){
            throw error
        }
    }
    async getOne(field, data){
        let ElementoBuscado
        try{
            const objetoBusqueda = new Object()
            objetoBusqueda[`${field}`] = data
            ElementoBuscado = await this.coleccion.findOne(objetoBusqueda)
            if (!ElementoBuscado) {
                throw error_generator.NOT_FOUND()
            }
            return ElementoBuscado
        }
        catch(error){
            throw error         
        }
    }

    async cleanById(id){
        let resultado
        try{
            resultado = await this.coleccion.findOneAndDelete({_id: id})
            if(!resultado.value){
                throw error_generator.NOT_FOUND(`El elemento con id ${id} no fue encotrado`)
            }
        }
        catch(error){
            throw error
        }
    }
    async getAll(){
        try{
            const AllObjects = await this.coleccion.find().toArray()
            return AllObjects
        }
        catch(error){
            throw error
        }
    }

    async update(updateData){
        const id = updateData._id
        //delete updateData._id
        let resultado
        try{
            resultado = await this.coleccion.findOneAndUpdate({_id: id}, 
                {$set: updateData })
            if(!resultado){
                throw error_generator.NOT_FOUND(`El elemento con id ${id} no fue encotrado`)
            }
            return resultado.value
        }
        catch(error){
            throw error
        }
    }
    /*
    async getByName(dato, type){
        let ElementoBuscado
        try{
            switch (type) {
                case 'Usuario': 
                    ElementoBuscado = await this.coleccion.findOne({EMAIL: `${dato}`})
                    break
                case 'Producto':
                    ElementoBuscado = await this.coleccion.findOne({TITLE: `${dato}`})
                    break
                default:
                    throw error_generator.UNKNOWN_TYPE(`Tipo ${type} desconocido`)
            }
            if (!ElementoBuscado) {
                throw error_generator.NOT_FOUND()
            }
            return ElementoBuscado
        }
        catch(error){
            if(error.tipo === 'NOT_FOUND' || error.tipo === 'UNKNOWN_TYPE'){
                throw error
            } else{
                logger.info('No se pudo leer la base')
                throw error
            }
          
        }
    }
    async getByID(id){
        try{
            if(id.length != 24){
                throw error_generator.MISSING_DATA('El id debe contener 24 caracteres')
            }
            const MongoID = ObjectId(id)
            const ElementoBuscado = await this.coleccion.findOne({_id: MongoID})
            if (!ElementoBuscado) {
                throw error_generator.NOT_FOUND()
            }
            return ElementoBuscado
        }
        catch(error){
            if(error.tipo === 'NOT_FOUND'){
                throw error
            } else{
                logger.info('No se pudo leer la base')
                logger.info(error)
                throw error
            }
          
        }
    }*/
}

export default Class_Mongo

function Getdate () {
    const hoy = new Date();
    const fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear()
    const hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    return fecha + ' ' + hora
}

function AuthorChecker(datos){
    if( emailRegex.test(datos.EMAIL) &&
        datos.hasOwnProperty("EMAIL") &&
        datos.hasOwnProperty("NOMBRE") &&
        datos.hasOwnProperty("APELLIDO") &&
        datos.hasOwnProperty("EDAD") &&
        datos.hasOwnProperty("ALIAS") &&
        datos.hasOwnProperty("AVATAR")
        ) if (datos.hasOwnProperty("EMAIL") &&
        datos.NOMBRE.length > 0 &&
        datos.APELLIDO.length > 0 &&
        datos.EDAD.length > 0 &&
        datos.ALIAS.length > 0 &&
        datos.AVATAR.length > 0
        ) return true
    else return false
    }

const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;