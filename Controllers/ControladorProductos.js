import { ProductosDao as Productos } from "../DAOs/Productos/index.js"
import logger from "../Tools/logger.js"


const ControladorProductos = {
    AllProd: async (req, res, next) => {
        try {
            const AllProd = await Productos.getAll()
            res.send(AllProd)
        } catch (error) {
            next(error)
        }
    },
    ProdByID: async (req, res, next) => {
        const id = req.params.id
        try {
            const ProductoBuscado = await Productos.getById(id);
            res.json(ProductoBuscado)
        } catch (error) {
            next(error)
        }
    },
    AddNewProd: async (req, res, next) => {
        const NewProduct = req.body
        try{
            const ProductAdded = await Productos.save(NewProduct);
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
            const updatedProd = await Productos.UpdateProd(id, UpdateData);
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
            await Productos.deleteById(id);
            res.status(202).send('Producto Eliminado con exito')
            logger.info(`Se elimino el producto id: ${id}`)
        } catch (error) {
            next(error)
        }
    }

}

const FunctionsProductCtrl = {
    AllProd: async () => {
        try {
            const AllProd = await Productos.getAll()
            return AllProd
        }
        catch (error) {
            throw error
        }
    },
    AddNewProd: async NewProduct => {
        try{
            const ProductAdded = await Productos.save(NewProduct);
            return "Product added"
        }
        catch (error) {
            throw error
        }
    }
}

export { ControladorProductos, FunctionsProductCtrl }