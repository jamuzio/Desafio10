import Product from "../Models/Class/Product.js"
import generateID from "../Tools/ID_gen.js"
import error_generator from "../Tools/Error_Generator.js"
import { ProductosDao } from "../Models/DAOs/Productos/index.js"

class ProductosApi {
    constructor() {
        this.productos = ProductosDao
    }
    async CreateNewProd(NewProduct){
        try{
            if (await this.productos.ProdExist(NewProduct)){
                throw error_generator.DUPLICATED_PRODUCT()
            } else {
                const ID = generateID()
                const producto = new Product({id:ID, title:NewProduct.TITLE, price:NewProduct.PRICE, thumbnail:NewProduct.THUMBNAIL})
                await this.productos.save(producto.datos())
                return producto.datos()
            }
        }
        catch(error){
            throw error
        }
     }
     async allProducts(){
        try{
            return Object.freeze(this.productos.getAll())
        }
        catch(error){
            throw error
        }
     }
     async getProdById(id){
        try{
            return await this.productos.getById(id)
        }
        catch(error){
            throw error
        }
     }
     async deleteProdById(id){
        try{
            await this.productos.deleteById(id)
        }
        catch(error){
            throw error
        }
     }
     async UpdateProd(id, datos){
        try{
            const productoBuscado = await this.productos.getById(id)
            console.log(productoBuscado)
            let producto = new Product({id: productoBuscado._id, title: productoBuscado.TITLE, price: productoBuscado.PRICE, thumbnail: productoBuscado.THUMBNAIL})
            if(!!datos.THUMBNAIL) producto.updatethumbnail(datos.THUMBNAIL)
            if(!!datos.PRICE) producto.updateprice(datos.PRICE)
            console.log(producto.datos())
            return await this.productos.UpdateProd(producto.datos())
        }
        catch(error){
            throw error
        }
     }
}

export default ProductosApi
