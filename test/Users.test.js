import {chaiWhitServer, chai} from "./index.js"

const Email = `Test${Date.now()}@test.com`

const testUser= {
       "EMAIL": Email,
        "PWD": "12345"
    }
const UserNoPWD= {
    EMAIL: "test@test.com"
}
const userWhitInvalidEmail = {
    EMAIL: "test",
    PWD: 12345
}

describe('Testing session enpoint to add New User (POST to /api/session/register)', () => {
    let responce
    it('It should recive an 200 code if I send a valid user', (done) => {
        chaiWhitServer.post('/api/session/register')
                        .set('contect-type', 'application/json')
                        .send(testUser)
                        .end((err, res) => {
                            responce = res
                            chai.assert.equal(res.statusCode, 200)
                            done()
                        })
    })
    it('It should return a html page',(done) => {
        chai.expect(responce).to.be.html
        done()
    })
    it('It should redirect to /api/session/login', (done) => {
        chai.expect(responce).to.redirect
        done()
    })
    it('It should recive an 400 code if I send a invalid user', (done) => {
        chaiWhitServer.post('/api/session/register')
                        .set('contect-type', 'application/json')
                        .send(UserNoPWD)
                        .end((err, res) => {
                            chai.assert.equal(res.statusCode, 400)
                            done()
                        })
    })
    it('It should recive an 400 code if I send a user whit an inavalid email', (done) => {
        chaiWhitServer.post('/api/session/register')
                        .set('contect-type', 'application/json')
                        .send(userWhitInvalidEmail)
                        .end((err, res) => {
                            chai.assert.equal(res.statusCode, 400)
                            done()
                        })
    })
})
describe('Testing session enpoint to login (POST to /api/session/login)', () => {
    let responce
    it('It should recive an 200 code if I send a valid user', (done) => {
        chaiWhitServer.post('/api/session/login')
                        .set('contect-type', 'application/json')
                        .send(testUser)
                        .end((err, res) => {
                            responce = res
                            chai.assert.equal(res.statusCode, 200)
                            done()
                        })
    })
    it('It should return a html page',(done) => {
        chai.expect(responce).to.be.html
        done()
    })
    it('It should redirect to /', (done) => {
        chai.expect(responce).to.redirect
        done()
    })
    it('It should recive an 401 code if I send a invalid request', (done) => {
        chaiWhitServer.post('/api/session/login')
                        .set('contect-type', 'application/json')
                        .send(UserNoPWD)
                        .end((err, res) => {
                            chai.assert.equal(res.statusCode, 401)
                            done()
                        })
    })
    it('It should recive an 401 code if I send a user whit an inavalid credentials', (done) => {
        chaiWhitServer.post('/api/session/login')
                        .set('contect-type', 'application/json')
                        .send({
                            "EMAIL": "test@test.com",
                            "PWD": 'WrongPWD'
                        })
                        .end((err, res) => {
                            chai.assert.equal(res.statusCode, 401)
                            done()
                        })
    })
    it('It should recive an 401 code if I send a no register user', (done) => {
        chaiWhitServer.post('/api/session/login')
                        .set('contect-type', 'application/json')
                        .send({
                            "EMAIL": "otherUser@test.com",
                            "PWD": 'otherPWD'
                        })
                        .end((err, res) => {
                            chai.assert.equal(res.statusCode, 401)
                            done()
                        })
    })
})
    /*
    it('Should return the data of the new prod', (done) => {
        let newProd = responce.body
        delete newProd._id
        chai.assert.deepEqual(ProductsToAdd[0], newProd)
        done()
    })
    it('It should recive an 409 code if I try to duplicate the product', (done) => {
        chaiWhitServer.post('/api/productos')
                        .set('contect-type', 'application/json')
                        .send(ProductsToAdd[0])
                        .end((err, res) => {
                            responce = res
                            chai.assert.equal(res.statusCode, 409)
                            done()
        })
    })
    it('Try to add a second product', (done) => {
        chaiWhitServer.post('/api/productos')
                        .set('contect-type', 'application/json')
                        .send(ProductsToAdd[1])
                        .end((err, res) => {
                            responce = res
                            chai.assert.equal(res.statusCode, 201)
                            chai.expect(res).to.be.json
                            IDs.push(res.body?._id)
                            done()
        })
    })*/

    after(done => chaiWhitServer.close(done()))