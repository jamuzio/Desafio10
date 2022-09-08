//import { ProductosDao as Productos } from "../Models/DAOs/Productos/index.js"
import logger from "../Tools/logger.js"
import ProductosApi from "../APIs/API_Productos.js"

const Api_Prod = new ProductosApi

const ControladorProductos = {
    AllProd: async (req, res, next) => {
        try {
            const AllProd = await Api_Prod.allProducts()
            res.send(AllProd)
        } catch (error) {
            next(error)
        }
    },
    ProdByID: async (req, res, next) => {
        const id = req.params.id
        try {
            const ProductoBuscado = await Api_Prod.getProdById(id);
            res.json(ProductoBuscado)
        } catch (error) {
            next(error)
        }
    },
    AddNewProd: async (req, res, next) => {
        const NewProduct = req.body
        try{
            const ProductAdded = await Api_Prod.CreateNewProd(NewProduct)
            res.status(201).json(ProductAdded)
            logger.info(`Se agrego el producto ${ProductAdded.TITLE} con el id: ${ProductAdded._id}`)
        }
        catch(error) {
            next(error)
        }
    },
    UpdateProd: async (req, res, next) => {
        const id = req.params.id
        const UpdateData = req.body
        
        try {
            const updatedProd = await Api_Prod.UpdateProd(id, UpdateData);
            console.log(updatedProd)
            res.status(202).json(updatedProd)
            logger.info(`Se actualizo el producto id: ${id} con los datos ${UpdateData}`)
        } 
        catch (error) {
            next(error)
        }
    },
    DeleteProdByID: async (req, res, next) => {
        const id = req.params.id
        try {
            await Api_Prod.deleteProdById(id);
            res.status(204).send('Producto Eliminado con exito')
            logger.info(`Se elimino el producto id: ${id}`)
        } catch (error) {
            next(error)
        }
    }

}

const FunctionsProductCtrl = {
    AllProd: async () => {
        try {
            const AllProd = await Api_Prod.getAll()
            return AllProd
        }
        catch (error) {
            throw error
        }
    },
    AddNewProd: async NewProduct => {
        try{
            const ProductAdded = await Api_Prod.CreateNewProd(NewProduct)
            return "Product added"
        }
        catch (error) {
            throw error
        }
    }
}

export { ControladorProductos, FunctionsProductCtrl }