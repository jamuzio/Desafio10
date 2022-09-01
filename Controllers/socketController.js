import { FunctionsProductCtrl } from './ControladorProductos.js'
import { MensajesDao as Mensajes } from '../DAOs/Mensajes/index.js'
import { normalize, denormalize, schema } from 'normalizr'
import logger from '../Tools/logger.js'

//Definimos esquema de Autores
const authorSchema = new schema.Entity('autores',{},{idAttribute: 'EMAIL'})

// Definimos un esquema de mensaje
const MessageSchema = new schema.Entity('Mesanjes', {
    AUTHOR: authorSchema
  },{idAttribute: '_id'})

//Declaramos que se va a recibir un Array de Schemas
const MessagesSchema = [MessageSchema]

async function eventCnx(socket, io) {
    logger.info("Nueva conexion iniciada")
    await Prod_Emit(socket)
    await Msj_emit(io)
    socket.on('NewProd', NewProd => eventoNewPrdo(socket, io, NewProd))
    socket.on('mensaje', mensaje => eventoMensajeController(socket, io, mensaje))
}

async function eventoNewPrdo(socket, io, NewProd){
    try{
        await FunctionsProductCtrl.AddNewProd(NewProd)
        socket.emit('NewProd_res', "Producto Añadido Exitosamente")
        await Prod_EmitToAll(io)
    }
    catch(error){
        if (error.tipo === 'MISSING_DATA'){
            logger.error("(SOCKET) MISSING_DATA: Se requieren mas datos para completar esta accion")
            socket.emit('NewProd_res', "Se requieren mas datos para completar esta accion")
        }else if (error.tipo === 'DUPLICATED_PRODUCT'){
            logger.error("(SOCKET) DUPLICATED_PRODUCT: Producto Duplicado")
            socket.emit('NewProd_res', "Producto Duplicado")
        }else {
            logger.error(`ATENCION: A ocurrido un error desconocido en el socket. \n\t ${error.stack} `)
            socket.emit('NewProd_res', "Error desconocido")
        }
    }
}

async function eventoMensajeController(socket, io, mensaje) {
    try{
        await Mensajes.save(mensaje)
        socket.emit('Msj_res', "")
    }
    catch(error){
        if (error.tipo === 'MISSING_DATA'){
            logger.error("(SOCKET) MISSING_DATA: Debe ingresar correctamente los datos de autor para usar el chat")
            socket.emit('Msj_res', "Debe ingresar correctamente los datos de autor para usar el chat")
        }else if (error.tipo === 'MISSING_MESSAGE'){
            logger.error("(SOCKET) MISSING_MESSAGE: Debe ingresar un mensaje")
            socket.emit('Msj_res', "Debe ingresar un mensaje")
        }
        else {
            logger.error(`ATENCION: A ocurrido un error desconocido en el socket. \n\t ${error.stack} `)
            socket.emit('Msj_res', "Error en servidor, por favor intente nuevamente")
        }
    }

    await Msj_emit(io)
}

async function Msj_emit(io) {
    const mensajes_all = await Mensajes.getAll()
    const mensajesNormalizados = normalize(mensajes_all, MessagesSchema )
    io.sockets.emit('mensajes', mensajesNormalizados)
}

async function Prod_Emit(socket) {
    const AllProd = await FunctionsProductCtrl.AllProd()
    const data = {
        AllProd,
        hayProductos: Boolean(AllProd.length > 0)
    }
    socket.emit('Products', data)
}

async function Prod_EmitToAll(io) {
    const AllProd = await FunctionsProductCtrl.AllProd()
    const data = {
        AllProd,
        hayProductos: Boolean(AllProd.length > 0)
    }
    io.sockets.emit('Products', data)
}
export default eventCnx
