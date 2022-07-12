function errorHandler(error, req, res, next) {
    let KnowError = true
    switch (error.tipo) {
        case 'MISSING_DATA':
            res.status(400)
            break
        case 'AUTHE_ERROR':
            res.status(401)
            break
        case 'AUTHO_ERROR':
            res.status(403)
            break
        case 'NOT_FOUND':
            res.status(404)
            break
        case 'DUPLICATED_PRODUCT':
            res.status(409)
            break
        case 'DUPLICATED_USER':
            res.status(409)
            break
        default:
            KnowError = false
            res.status(500)
    }
    if(KnowError){
        console.log(`${error.tipo}: ${error.message}`)
        res.json({ msj: error.message })
    } else{
        res.json({ msj: "Error Interno del servidor" })
        throw error

    }
}

export default errorHandler

