import Class_Mongo from "../../Class/Class_Mongo.js"

class ProductosDaoMongoDb extends Class_Mongo {

    constructor() {
        super('Productos')
    }
    async save(datos){
        return await super.save(datos, 'Producto')
     }
     async deleteById(id){
         await super.cleanById(id, 'Producto')
     }
     async update(id, datos){
         await super.update(id, datos, 'Producto')
     }
}

export default ProductosDaoMongoDb
