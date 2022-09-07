import Class_MEM from "../../Class/Class_MEM.js"
import Product from "../../Models/Product.js"
import generateID from "../../Tools/ID_gen.js"
import error_generator from "../../Tools/Error_Generator.js"

class ProductosDaoMem extends Class_MEM {
    save(datos){
        try{
            const productoBuscado = this.Objects.find(p => p.TITLE == datos.TITLE)
            if (!productoBuscado){
                const ID = generateID()
                const producto = new Product({id:ID, title:datos.TITLE, price:datos.PRICE, thumbnail:datos.THUMBNAIL})
                super.save(producto.datos())
                return producto.datos()
            } else {
                throw error_generator.DUPLICATED_PRODUCT()
            }
        }
        catch(error){
            throw error
        }
     }
     getByName(data){
        try{
            return super.getOne('TITLE', data)
        }
        catch(error){
            throw error
        }
     }
     getById(id){
        try{
            return super.getOne('_id', id)
        }
        catch(error){
            throw error
        }
     }
     deleteById(id){
         super.cleanById(id)
     }
    UpdateProd(id, datos){
        try{
            const productoBuscado = this.getById(id)
            let producto = new Product({id: productoBuscado._id, title: productoBuscado.TITLE, price: productoBuscado.PRICE, thumbnail: productoBuscado.THUMBNAIL})
            if(!!datos.THUMBNAIL) producto.updatethumbnail(datos.THUMBNAIL)
            if(!!datos.PRICE) producto.updateprice(datos.PRICE)
            return super.update(producto.datos())
        }
        catch(error){
            throw error
        }
     }
}

export default ProductosDaoMem
