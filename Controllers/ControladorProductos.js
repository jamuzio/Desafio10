import ProductosDaoMongoDb from '../DAOs/Productos/ProductosDaoMongoDb.js'
import crearError from '../Tools/Error_Generator.js'


const Productos = new ProductosDaoMongoDb()

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
        let ProductAdded
        try {
            if (NewProduct.hasOwnProperty("TITLE") && 
                NewProduct.hasOwnProperty("PRICE") && 
                NewProduct.hasOwnProperty("THUMBNAIL")){
                ProductAdded = await Productos.save(NewProduct);
            } else {
                throw crearError('MISSING_DATA')
            }
            res.status(201).json({ProductAdded})
        } catch (error) {
            next(error)
        }
    },
    UpdateProd: async (req, res, next) => {
        const id = req.params.id
        const UpdateData = req.body
        try {
            if (UpdateData.hasOwnProperty("TITLE") && 
                UpdateData.hasOwnProperty("PRICE") && 
                UpdateData.hasOwnProperty("THUMBNAIL")){
                    await Productos.UpdateProd(id, UpdateData);
            } else {
                throw crearError('MISSING_DATA')
            }
            res.status(202).json(UpdateData)
        } catch (error) {
            next(error)
        }
    },
    DeleteProdByID: async (req, res, next) => {
        const id = req.params.id
        try {
            await Productos.deleteById(id);
            res.status(202).send('Producto Eliminado con exito')
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
        } catch (error) {
            throw error
        }
    },
    AddNewProd: async NewProduct => {
        try {
            if (NewProduct.hasOwnProperty("TITLE") && 
                NewProduct.hasOwnProperty("PRICE") && 
                NewProduct.hasOwnProperty("THUMBNAIL")&&
                NewProduct.TITLE.length > 0 &&
                NewProduct.PRICE.length > 0 &&
                NewProduct.THUMBNAIL.length > 0){
                    await Productos.save(NewProduct);
            } else {
                throw crearError('MISSING_DATA')
            }
            return "Product added"
        } catch (error) {
            throw error
        }
    }
}

export { ControladorProductos, FunctionsProductCtrl }