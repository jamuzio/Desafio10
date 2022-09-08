
let MensajesDao

switch (process.env.MODO_PERSISTENCIA) {
    case 'mongodb':
        const { default: MensajesDaoMongoDb } = await import('./MensajesDaoMongoDb.js')
        MensajesDao = new MensajesDaoMongoDb()
        break
    default:
        const { default: MensajesDaoMem } = await import('./MensajesDaoMem.js')
        MensajesDao = new MensajesDaoMem()
        break
}

export { MensajesDao }