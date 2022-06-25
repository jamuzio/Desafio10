import ProductosDaoMongoDb from '../DAOs/Productos/ProductosDaoMongoDb.js'
import { faker } from '@faker-js/faker'
faker.locale = 'es'
const { commerce, image } = faker

const Productos = new ProductosDaoMongoDb()

const WebController = {
    AddNewProd: async (req, res) => {
        res.render('ProdManag', [])
    },
    ProdDisplay:async (req, res) => {
        let AllProd = await Productos.getAll()
        const data = {
            AllProd,
            hayProductos: Boolean(AllProd.length > 0)
        }
        res.render('ProductsDisplay', data)
    },
    TestProdDisplay:async (req, res) => {
        let AllProd = GenerateRandomProd()
        const data = {
            AllProd,
            hayProductos: true
        }
        res.render('ProductsDisplay', data)
    }
}
function GenerateRandomProd(){
    let Prod = []
    for (let i = 0; i < 5; i++) {
        Prod.push({
            ID: `${Date.now()}`,
            TITLE: commerce.product(),
            PRICE: commerce.price(100, 5000, 0),
            THUMBNAIL: image.imageUrl(640, 480, 'products')
           })
    }
    return Prod
}

export { WebController }