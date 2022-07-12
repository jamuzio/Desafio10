import ProductosDaoMongoDb from '../DAOs/Productos/ProductosDaoMongoDb.js'
import { faker } from '@faker-js/faker'
faker.locale = 'es'
const { commerce, image } = faker

const Productos = new ProductosDaoMongoDb()

const WebController = {
    AddNewProd: async (req, res) => {
        const user = req.user.EMAIL
        const data = {
            user
        }
        res.render('ProdManag', data)
    },
    ProdDisplay:async (req, res) => {
        let AllProd = await Productos.getAll()
        const user = req.user.EMAIL
        const data = {
            user,
            AllProd,
            hayProductos: Boolean(AllProd.length > 0)
        }
        res.render('ProductsDisplay', data)
    },
    TestProdDisplay:async (req, res) => {
        let AllProd = GenerateRandomProd()
        const user = req.session.user
        const data = {
            user,
            AllProd,
            hayProductos: true
        }
        res.render('ProductsDisplay', data)
    },
    Login: (req, res) => {
        const data = {
            badLogin: !Boolean(req.query)
        } 
        res.render('Login', data)
    },
    Logout: (req, res) => {
        const user = req.session.user
        const data = {
            user
        }
        res.render('Logout', data)
    },
    Registro: (req, res) => {
        res.render('registroUsuario')
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