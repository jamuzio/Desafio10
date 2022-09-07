import chai from 'chai'
import chaiHttp from 'chai-http'
import OpenServer from '../src/Server.js'

chai.use(chaiHttp)

const chaiWhitServer = chai.request(OpenServer(8080)).keepOpen()

export {chaiWhitServer, chai}