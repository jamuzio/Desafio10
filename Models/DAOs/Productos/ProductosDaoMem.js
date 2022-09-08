import Class_MEM from "../../DB/Class_MEM.js"

class ProductosDaoMem extends Class_MEM {
    save(datos){
        try{
            super.save(datos)
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
        try{
            super.cleanById(id)
        }
        catch(error){
            throw error
        }
     }
    UpdateProd(datos){
        try{
            return super.update(datos)
        }
        catch(error){
            throw error
        }
     }
     ProdExist(datos){
        const productoBuscado = this.Objects.find(p => p.TITLE == datos.TITLE)
        if (!productoBuscado){
            return false
        } else{
            return true
        }
        
     }
}

export default ProductosDaoMem
