function crearError(tipo, mensaje = false) {
    if(!mensaje){
        switch(tipo){
        case 'UNKNOWN_TYPE': 
            mensaje = 'Este tipo es desconocido por la clase'
            break
        case 'DUPLICATED_PRODUCT':
            mensaje = 'Producto Dupliacado'
            break
        case 'DUPLICATED_USER':
            mensaje = 'Usuario ya regitrado'
            break
        case 'MISSING_DATA':
            mensaje = 'Se requieren mas datos para completar esta accion'
            break
        case 'MISSING_MESSAGE':
            mensaje = 'No hay mensaje'
            break
        case 'NOT_FOUND':
            mensaje = 'Recurso no encontrado'
            break
        case 'AUTHE_ERROR':
            mensaje = 'Error de Autenticacion, credenciales no validas'
            break
        case 'AUTHO_ERROR':
            mensaje = 'Error de Autorizacion, no tiene los permisos necesarios'
            break
        default:
            mensaje = 'Error sin especificar'
        }
    }
    const error = new Error(mensaje)
    error.tipo = tipo
    return error
}

export default crearError