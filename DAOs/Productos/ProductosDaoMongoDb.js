import Class_Mongo from "../../Class/Class_Mongo.js"
import Product from "../../Models/Product.js"
import generateID from "../../Tools/ID_gen.js"
import error_generator from "../../Tools/Error_Generator.js"

class ProductosDaoMongoDb extends Class_Mongo {

    constructor() {
        super('Productos')
    }
    async save(datos){
        try{
            const productoBuscado = await this.coleccion.find({TITLE: `${datos.TITLE}`}).toArray()
            if (productoBuscado.length === 0){
                const ID = generateID()
                const producto = new Product({id:ID, title:datos.TITLE, price:datos.PRICE, thumbnail:datos.THUMBNAIL})
                await super.save(producto.datos())
                return producto.datos()
            } else {
                throw error_generator.DUPLICATED_PRODUCT()
            }
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
     async getByID(id){
        try{
            return await super.getOne('_id', id)
        }
        catch(error){
            throw error
        }
     }
     async deleteById(id){
         await super.cleanById(id)
     }
     async UpdateProd(id, datos){
        try{
            const productoBuscado = await this.getByID(id)
            let producto = new Product({id: productoBuscado._id, title: productoBuscado.TITLE, price: productoBuscado.PRICE, thumbnail: productoBuscado.THUMBNAIL})
            if(!!datos.THUMBNAIL) producto.updatethumbnail(datos.THUMBNAIL)
            if(!!datos.PRICE) producto.updateprice(datos.PRICE)
            return await super.update(producto.datos())
        }
        catch(error){
            throw error
        }
     }
}

export default ProductosDaoMongoDb
