import Class_Mongo from "../../DB/Class_Mongo.js"
import error_generator from "../../../Tools/Error_Generator.js"

class ProductosDaoMongoDb extends Class_Mongo {

    constructor() {
        super('Productos')
    }
    async save(datos){
        try{
            await super.save(datos)
        }
        catch(error){
            throw error
        }
     }
     async getByName(data){
        try{
            return await super.getOne('TITLE', data)
        }
        catch(error){
            throw error
        }
     }
     async getById(id){
        try{
            return await super.getOne('_id', id)
        }
        catch(error){
            throw error
        }
     }
     async deleteById(id){
        try{
            await super.cleanById(id)
        }
        catch(error){
            throw error
        }
     }
     async UpdateProd(datos){
        try{
            await super.update(datos)
            return datos
        }
        catch(error){
            throw error
        }
     }
     async ProdExist(datos){
        const productoBuscado = await this.coleccion.find({TITLE: `${datos.TITLE}`}).toArray()
        if (productoBuscado.length === 0){
            return false
        } else{
            return true
        }
        
     }
}

export default ProductosDaoMongoDb
