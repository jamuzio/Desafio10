import crearError from "../Tools/Error_Generator.js"


class Class_MEM {
    constructor (){
        this.Objects = []
        
    }
    save(datos, type){
        let hoy = new Date()
        const id = Date.now()
        let NewElement
        if(type === 'Carrito' ){
            NewElement = {
                ID: `${id}`,
                TIMESTAMP: `${hoy.toDateString() +' '+  hoy.toLocaleTimeString()}`,
                PRODUCTOS: []
                }
        } else if(type === 'Producto'){
            if (!this.Objects.find(p => p.NOMBRE == datos.NOMBRE) &&
            !this.Objects.find(p => p.CODIGO == datos.CODIGO)){
                NewElement = {
                    ID: `${id}`,
                    TIMESTAMP: `${hoy.toDateString() +' '+  hoy.toLocaleTimeString()}`,
                    NOMBRE: datos.NOMBRE,
                    DESCRIPCION: datos.DESCRIPCION,
                    CODIGO: datos.CODIGO,
                    FOTO: datos.FOTO,
                    PRECIO: datos.PRECIO,
                    STOCK: datos.STOCK
                }
            } else {
                throw crearError('DUPLICATED_PRODUCT')
            }
        } else {
            throw crearError('UNKNOWN_TYPE', `Tipo ${type} desconocido`)
        }
        this.Objects.push(NewElement)
        if(type === 'Carrito') {
            return id
        }
        else if( type === 'Producto') {
            return NewElement
        }
    }
    cleanById(id, type){
        const indiceBuscado = this.Objects.findIndex(p => p.ID == id)
        if(indiceBuscado === -1){
            const error = new Error(`El ${type} con id ${id} no fue encotrado`)
            error.tipo = 'db not found'
            throw error
        } else {
            if(type === 'Carrito' ){
                this.Objects[indiceBuscado].PRODUCTOS = []      
            } else if(type === 'Producto'){
                this.Objects.splice(indiceBuscado,1)  
            } else {
                throw crearError('UNKNOWN_TYPE', `Tipo ${type} desconocido`)
            }
        }
    }
    getAll(){
        return this.Objects
    }

    update(id, dato, type){
        let hoy = new Date()
        const indiceBuscado = this.Objects.findIndex(p => p.ID == id)
        if(indiceBuscado === -1){
            throw crearError('NOT_FOUND', `El ${type} con id ${id} no fue encotrado`)
        } else {
            if(type === 'Carrito' ){
                this.Objects[indiceBuscado].TIMESTAMP = `${hoy.toDateString() +' '+ hoy.toLocaleTimeString()}`,
                this.Objects[indiceBuscado].PRODUCTOS.push(dato)                        
            } else if(type === 'Producto'){
                this.Objects[indiceBuscado].TIMESTAMP = `${hoy.toDateString() +' '+ hoy.toLocaleTimeString()}`,
                this.Objects[indiceBuscado].NOMBRE = dato.NOMBRE
                this.Objects[indiceBuscado].DESCRIPCION = dato.DESCRIPCION
                this.Objects[indiceBuscado].CODIGO = dato.CODIGO
                this.Objects[indiceBuscado].FOTO = dato.FOTO
                this.Objects[indiceBuscado].PRECIO = dato.PRECIO
                this.Objects[indiceBuscado].STOCK = dato.STOCK 
            } else if(type === 'CarrRmProd'){
                const IndiceProdBuscado = this.Objects[indiceBuscado].PRODUCTOS.findIndex(p => p.ID == dato)
                if(IndiceProdBuscado === -1){
                    throw crearError('NOT_FOUND', `El producto con id ${dato} no se encuntra en el carrito`)
                } else{
                    this.Objects[indiceBuscado].PRODUCTOS.splice(IndiceProdBuscado,1)
                }
                accion = 'quito el producto del carrito!'
            } else {
                throw crearError('UNKNOWN_TYPE', `Tipo ${type} desconocido`)
            }
        }
    }
    getByID(id){
        try{
            const ElementoBuscado = this.Objects.find(p => p.ID == id)
            if (!ElementoBuscado) {
                throw crearError('NOT_FOUND')
            }
            return ElementoBuscado
        }
        catch(error){
            throw error
        }
    }
}

export default Class_MEM