import dbDesafio9 from "../DataBase/MongoServer.js"
import { ObjectId } from "mongodb"


class Class_Mongo {
    constructor (coleccion){
        this.coleccion = dbDesafio9.collection(coleccion)
    }
    async save(datos, type){
        let NewElement
        try{
        if(type === 'Mensajes' ){
            if(AuthorChecker(datos)){
                if(!datos.hasOwnProperty("TEXTO") || datos.TEXTO.length === 0){
                    const error = new Error('Sin Mensaje')
                    error.tipo = 'no message'
                    throw error
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
                const error = new Error('Datos de Autor erroneos')
                error.tipo = 'no autor data'
                throw error
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
                const error = new Error('Producto Duplicado')
                error.tipo = 'duplicated product'
                throw error
            }
        } else {
            const error = new Error(`Typo ${type} desconocido `)
            error.tipo = 'unknown type'
            throw error
        }
        await this.coleccion.insertOne(NewElement)
        console.log(`Nuevo ${type} creado`)
        if( type === 'Producto') {
            return NewElement
        }
        }
        catch(error){
            console.log(`No se pudo crear un nuevo ${type}.`)
            console.log(error)
            throw error
        }
    }
    async cleanById(id, type){
        let accion
        let resultado
        const MongoID = ObjectId(id)
        try{
            if(type === 'Producto'){
                resultado = await this.coleccion.findOneAndDelete({_id: MongoID})
                accion = 'borrado'   
            } else {
                const error = new Error(`Typo ${type} desconocido `)
                error.tipo = 'unknown type'
                throw error
            }
            if(!resultado.value){
                const error = new Error(`El ${type} con id ${id} no fue encotrado`)
                error.tipo = 'db not found'
                throw error
            } else {
                console.log(`El ${type} se a ${accion} exitosamente!`)
            }
        }
        catch(error){
            if(error.tipo != 'db not found' && error.tipo != 'unknown type' ){
                console.log(`El ${type} no pudo ser ${accion}`)
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
            console.log('No se pudo leer la base')
            throw error
        }
    }

    async update(id, dato, type){
        let hoy = new Date()
        let resultado
        let accion
        const MongoID = ObjectId(id)
        try{
            if(type === 'Producto'){
                resultado = await this.coleccion.findOneAndUpdate({_id: MongoID}, 
                    {$set: {
                        TIMESTAMP: `${hoy.toDateString() +' '+ hoy.toLocaleTimeString()}`,
                        NOMBRE: dato.NOMBRE,
                        DESCRIPCION: dato.DESCRIPCION,
                        CODIGO: dato.CODIGO,
                        FOTO: dato.FOTO,
                        PRECIO: dato.PRECIO,
                        STOCK: dato.STOCK
                    }})
                resultado = resultado.value
                accion = 'actualizo el producto!'                                  
            } else {
                const error = new Error(`Typo ${type} desconocido `)
                error.tipo = 'unknown type'
                throw error
            }
            if(!resultado){
                const error = new Error(`El ${type} con id ${id} no fue encotrado`)
                error.tipo = 'db not found'
                throw error
            } else {
                console.log(`Se ${accion}`)
            }
        }
        catch(error){
            if(error.tipo != 'db not found' && error.tipo != 'unknown type' ){
                console.log(`No se pudo ${accion}`)
            }
            throw error
        }
    }
    async getByID(id){
        const MongoID = ObjectId(id)
        try{
            const ElementoBuscado = await this.coleccion.findOne({_id: MongoID})
            if (!ElementoBuscado) {
                const error = new Error('No existe el elemento buscado')
                error.tipo = 'db not found'
                throw error
            }
            return ElementoBuscado
        }
        catch(error){
            if(error.tipo === 'db not found'){
                throw error
            } else{
                console.log('No se pudo leer el archivo. :(')
                console.log(error)
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