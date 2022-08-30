/**
 * Devuelve un error personalizado
 */
const error_generator = {

    /**
     *@param mensaje {string} 'Mensaje opcional personalizado. Mensaje por defecto: Este tipo es desconocido por la clase'
     */
    UNKNOWN_TYPE: (mensaje = 'Este tipo es desconocido por la clase') => {
        return createError('UNKNOWN_TYPE', mensaje)
    },

    /**
     *@param mensaje {string} 'Mensaje opcional personalizado. Mensaje por defecto: Producto Dupliacado'
     */ 
    DUPLICATED_PRODUCT: (mensaje = 'Producto Dupliacado') => {
        return createError('DUPLICATED_PRODUCT', mensaje)
    },

    /**
     *@param mensaje {string} 'Mensaje opcional personalizado. Mensaje por defecto: Usuario ya regitrado'
     */
    DUPLICATED_USER: (mensaje = 'Usuario ya regitrado') => {
        return createError('DUPLICATED_USER', mensaje)
    },

    /**
     *@param mensaje {string} 'Mensaje opcional personalizado. Mensaje por defecto: Se requieren mas datos para completar esta accion'
     */
    MISSING_DATA: (mensaje = 'Se requieren mas datos para completar esta accion') => {
        return createError('MISSING_DATA', mensaje)
    },

    /**
     *@param mensaje {string} 'Mensaje opcional personalizado. Mensaje por defecto: No hay mensaje'
     */
    MISSING_MESSAGE: (mensaje = 'No hay mensaje') => {
        return createError('MISSING_MESSAGE', mensaje)
    },
    
    /**
     *@param mensaje {string} 'Mensaje opcional personalizado. Mensaje por defecto: Recurso no encontrado'
     */
    NOT_FOUND: (mensaje = 'Recurso no encontrado') => {
        return createError('NOT_FOUND', mensaje)
    },

    /**
     *@param mensaje {string} 'Mensaje opcional personalizado. Mensaje por defecto: Error de Autenticacion, credenciales no validas'
     */
    AUTHE_ERROR: (mensaje = 'Error de Autenticacion, credenciales no validas') => {
        return createError('AUTHE_ERROR', mensaje)
    },

    /**
     *@param mensaje {string} 'Mensaje opcional personalizado. Mensaje por defecto: Error de Autorizacion, no tiene los permisos necesarios'
     */
    AUTHO_ERROR: (mensaje = 'Error de Autorizacion, no tiene los permisos necesarios') => {
        return createError('AUTHO_ERROR', mensaje)
    },

    /**
     *@param mensaje {string} 'Mensaje opcional personalizado. Mensaje por defecto: El tipo de dato es incorrecto este campo'
     */
    WRONG_TYPE: (mensaje = 'El tipo de dato es incorrecto este campo') => {
        return createError('WRONG_TYPE', mensaje)
    }
 }

 export default error_generator

function createError(tipo, mensaje) {
    const error = new Error(mensaje)
    error.tipo = tipo
    return error
}