import {chaiWhitServer, chai} from "./index.js";

const ProductsToAdd=[
    {
        TITLE: "TestProd1",
        PRICE: 12345,
        THUMBNAIL: "http:\\testProd1"
    },
    {
        TITLE: "TestProd2",
        PRICE: 12345,
        THUMBNAIL: "http:\\testProd2"
    },
    {
        TITLE: "TestProd3",
        PRICE: 12345,
        THUMBNAIL: "http:\\testProd3"
    }
]

const IDs = []

describe('Testing Products enpoint to add New Prod (POST to /api/productos)', () => {
    let responce
    it('It should recive an 201 code', (done) => {
        chaiWhitServer.post('/api/productos')
                        .set('contect-type', 'application/json')
                        .send(ProductsToAdd[0])
                        .end((err, res) => {
                            responce = res
                            chai.assert.equal(res.statusCode, 201)
                            done()
                        })
    })
    it('It should return a JSON data',(done) => {
        chai.expect(responce).to.be.json
        done()
    })
    it('It should return a JSON whit property _id', (done) => {
        chai.expect(responce.body).to.have.property('_id')
        IDs.push(responce.body?._id)
        done()
    })
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
    })
})
describe('Testing Products enpoint to add get a Product by his ID (GET to /api/productos/:id)', () => {
    it  ('Should return the TestPord1 if I sen his ID and a code 200', (done) =>{
        chaiWhitServer.get(`/api/productos/${IDs[0]}`)
                        .end((err, res) => {
                            chai.assert.equal(res.statusCode, 200)
                            let Prod = res.body
                            delete Prod._id
                            chai.assert.deepEqual(ProductsToAdd[0], Prod)
                            done()
                        })
})
    it  ('Should return the TestPord2 if I sen his ID and a code 200', (done) =>{
        chaiWhitServer.get(`/api/productos/${IDs[1]}`)
                        .end((err, res) => {
                            chai.assert.equal(res.statusCode, 200)
                            let Prod = res.body
                            delete Prod._id
                            chai.assert.deepEqual(ProductsToAdd[1], Prod)
                            done()
                        })
        })
})
describe('Testing Products enpoint to all products (GET to /api/productos)', () => {
    let responce
    it('It should return an 200 code', (done) => {
        chaiWhitServer.get('/api/productos')
                        .end((err, res) => {
                            chai.assert.equal(res.statusCode, 200)
                            responce = res
                            done()
                        })
                    })
    it('It should return a JSON data',(done) => {
        chai.expect(responce).to.be.json
        done()
    })
})
describe('Testing Products enpoint to Update a product, testing over TestProd1 (PUT to /api/productos/:id)', () => {
    let responce
    const upDateData = {"PRICE": 5555, "THUMBNAIL": 'http://newroute.com'}
    it  ('Should return a code 202 ', (done) =>{
        chaiWhitServer.put(`/api/productos/${IDs[0]}`)
                        .set('contect-type', 'application/json')
                        .send(upDateData)
                        .end((err, res) => {
                            chai.assert.equal(res.statusCode, 202)
                            responce = res
                            done()
                        })
        })
    it('It should return a JSON data',(done) => {
        chai.expect(responce).to.be.json
        done()
    })
    it('TestProd1 will dont have the same data', (done) => {
        let Prod = responce.body
        delete Prod._id
        chai.assert.notDeepEqual(ProductsToAdd[0], Prod)
        done()
    })
    it('Should change the Price and URL but not the TITLE', (done) => {
        let Prod = responce.body
        chai.assert.equal(Prod.TITLE, ProductsToAdd[0].TITLE)
        chai.assert.equal(Prod.PRICE, upDateData.PRICE)
        chai.assert.equal(Prod.THUMBNAIL, upDateData.THUMBNAIL)
        done()
    })
})
describe('Testing Products enpoint to Delete a product by his ID (DELETE to /api/productos/:id)', () => {
    it  ('Should return a code 204 when I delete TestProd1 ', (done) =>{
        chaiWhitServer.delete(`/api/productos/${IDs[0]}`)
                        .end((err, res) => {
                            chai.assert.equal(res.statusCode, 204)
                            done()
                        })
        })
    it('Shuld return a 404 if I try to get a non-existent TestProd1', (done) => {
        chaiWhitServer.get(`/api/productos/${IDs[0]}`)
                        .end((err, res) => {
                            chai.assert.equal(res.statusCode, 404)
                            done()
                        })
        })
    it  ('Should return a code 204 when I delete TestProd2', (done) =>{
        chaiWhitServer.delete(`/api/productos/${IDs[1]}`)
                        .end((err, res) => {
                            chai.assert.equal(res.statusCode, 204)
                            done()
                        })
        })
    it('Shuld return a 404 if I try to get a non-existent TestProd2', (done) => {
        chaiWhitServer.get(`/api/productos/${IDs[1]}`)
                        .end((err, res) => {
                            chai.assert.equal(res.statusCode, 404)
                            done()
                        })
        })
    it  ('Should return a code 404 if I try delete a non-existent TestProd1', (done) =>{
        chaiWhitServer.delete(`/api/productos/${IDs[1]}`)
                        .end((err, res) => {
                            chai.assert.equal(res.statusCode, 404)
                            done()
                        })
        })
})
                
                
                
