
let UsuarioDao

switch (process.env.MODO_PERSISTENCIA) {
    case 'mongodb':
        const { default: UsuarioDaoMongoDb } = await import('./UsuarioDaoMongoDb.js')
        UsuarioDao = new UsuarioDaoMongoDb()
        break
    default:
        const { default: UsuarioDaoMem } = await import('./UsuarioDaoMem.js')
        UsuarioDao = new UsuarioDaoMem()
        break
}

export { UsuarioDao }