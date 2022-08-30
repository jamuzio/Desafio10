import dbDesafio9 from "../DataBase/MongoServer.js"
import { ObjectId } from "mongodb"
import error_generator from "../Tools/Error_Generator.js"
import logger from "../Tools/logger.js"


class Class_Mongo {
    constructor (coleccion){
        this.coleccion = dbDesafio9.collection(coleccion)
    }
    async save(datos, type){
        let NewElement
        try{
            if(type === 'Mensajes' ){
                if(AuthorChecker(datos)){
                    if(!datos.TEXTO?.length > 0){
                        throw error_generator.MISSING_MESSAGE() 
                    }
                    NewElement = {
                        AUTHOR:
                            {
                                EMAIL: datos.EMAIL,
                                NOMBRE: datos.NOMBRE,
                                APELLIDO: datos.APELLIDO,
                                EDAD: datos.EDAD,
                                ALIAS: datos.ALIAS,
                                AVATAR: datos.AVATAR
                            },
                        DATE: `${Getdate()}`,
                        TEXT: datos.TEXTO
                        }
                } else{
                    throw error_generator.MISSING_DATA('Datos de autor erroneos')
                }
            } else if(type === 'Producto'){
                const Producto = await this.coleccion.find({TITLE: `${datos.TITLE}`}).toArray()
                if (Producto.length === 0){
                    NewElement = {
                        TITLE: datos.TITLE,
                        PRICE: datos.PRICE,
                        THUMBNAIL: datos.THUMBNAIL
                    }
                } else {
                    throw error_generator.DUPLICATED_PRODUCT()
                }
            }
            else if(type === 'Usuario'){
                const Usuario = await this.coleccion.find({EMAIL: `${datos.EMAIL}`}).toArray()
                if (Usuario.length === 0){
                    NewElement = {
                        EMAIL: datos.EMAIL,
                        PWD: datos.PWD
                    }
                } else {
                    throw error_generator.DUPLICATED_USER()
                }
            } else {
                throw error_generator.UNKNOWN_TYPE(`Tipo ${type} desconocido `)
            }
            const MongoID =  await this.coleccion.insertOne(NewElement)
            NewElement.ID = MongoID.insertedId
            logger.info(`Nuevo ${type} creado`)
            if( type === 'Producto' || type === 'Usuario') {
                return NewElement
            }
        }
        catch(error){
            logger.info(`No se pudo crear un nuevo ${type}.`)
            throw error
        }
    }
    async cleanById(id, type){
        let accion
        let resultado
        try{
            if(id.length != 24){
                throw error_generator.MISSING_DATA('El id debe contener 24 caracteres')
            }
            const MongoID = ObjectId(`${id}`)
            if(type === 'Producto'){
                resultado = await this.coleccion.findOneAndDelete({_id: MongoID})
                accion = 'borrado'   
            } else {
                throw error_generator.UNKNOWN_TYPE(`Tipo ${type} desconocido`)
            }
            if(!resultado.value){
                throw error_generator.NOT_FOUND(`El ${type} con id ${id} no fue encotrado`)
            } else {
                logger.info(`El ${type} se a ${accion} exitosamente!`)
            }
        }
        catch(error){
            if(error.tipo != 'NOT_FOUND' && error.tipo != 'UNKNOWN_TYPE' ){
                logger.info(`El ${type} no pudo ser ${accion}`)
            }
            throw error
        }
    }
    async getAll(){
        try{
            const AllObjects = await this.coleccion.find().toArray()
            return AllObjects
        }
        catch(error){
            logger.info('No se pudo leer la base')
            throw error
        }
    }

    async update(id, dato, type){
        let resultado
        let accion
        try{
            if(id.length != 24){
                throw error_generator.MISSING_DATA('El id debe contener 24 caracteres')
            }
            const MongoID = ObjectId(id)
            if(type === 'Producto'){
                resultado = await this.coleccion.findOneAndUpdate({_id: MongoID}, 
                    {$set: {
                        TITLE: dato.TITLE,
                        PRICE: dato.PRICE,
                        THUMBNAIL: dato.THUMBNAIL
                    }})
                resultado = resultado.value
                accion = 'actualizo el producto!'                                  
            } else {
                throw error_generator.UNKNOWN_TYPE(`Tipo ${type} desconocido`)
            }
            if(!resultado){
                throw error_generator.NOT_FOUND(`El ${type} con id ${id} no fue encotrado`)
            } else {
                logger.info(`Se ${accion}`)
            }
        }
        catch(error){
            if(error.tipo != 'NOT_FOUND' && error.tipo != 'UNKNOWN_TYPE' ){
                logger.info(`No se pudo ${accion}`)
            }
            throw error
        }
    }
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
    }
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