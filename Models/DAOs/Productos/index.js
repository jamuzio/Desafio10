
let ProductosDao

switch (process.env.MODO_PERSISTENCIA) {
    case 'mongodb':
        const { default: ProductosDaoMongoDb } = await import('./ProductosDaoMongoDb.js')
        ProductosDao = new ProductosDaoMongoDb()
        break
    default:
        const { default: ProductosDaoMem } = await import('./ProductosDaoMem.js')
        ProductosDao = new ProductosDaoMem()
        break
}

export { ProductosDao }