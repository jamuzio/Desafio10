import logger from "../Tools/logger.js"


const Routes_logger = (req, res, next) => {
    //logger.info(`Se a realizado un ${req.method} a la ruta ${req.originalUrl}`)
    next()
    
}

export default Routes_logger