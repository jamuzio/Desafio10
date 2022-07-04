import { Router } from 'express'
import { ControladorProductos } from '../Controllers/ControladorProductos.js'




const routerProductos = new Router()

routerProductos.get('/', ControladorProductos.AllProd)
routerProductos.get('/:id', ControladorProductos.ProdByID)
routerProductos.post('/', ControladorProductos.AddNewProd)
routerProductos.put('/:id', ControladorProductos.UpdateProd)
routerProductos.delete('/:id', ControladorProductos.DeleteProdByID)
//routerProductos.delete('/productos-test', ControladorProductos.TestProdDisplay)

export default routerProductos