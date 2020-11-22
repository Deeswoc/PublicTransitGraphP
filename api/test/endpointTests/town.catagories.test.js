const { assert } = require('chai');
let chai = require('chai');
let chathttp = require('chai-http');
let server = require('../../app');
let driver = require('../../config/database');
let expect = chai.expect;
let should = chai.should();
chai.use(chathttp);
let port = 3000;
let baseUrl = `http://localhost:${port}/`

let resetDB = async function () {
    let session = driver.session();

    await session.writeTransaction( tx => 
        tx.run(
`
        MATCH (n:LocationCategory)
        DETACH DELETE n
`)
    )
}

describe('/towns/categories',()=>{
    before((done)=>{
        console.log("Running test setup")
        resetDB();
        done();
    })

    after((done)=>{
        console.log("Clearing DB")
        resetDB();
        done();
    })

    describe('GET', ()=>{
        it('should return an empty list of catagories', (done)=>{
            chai.request(server)
                .get('/towns/categories')
                .end((err, res)=>{
                    should.not.exist(err);
                    should.exist(res);
                    res.should.have.status(200);
                    res.body.should.be.an('array')
                        .and.have.lengthOf(0);
                    done();
                })
        })
    })

    describe('POST', ()=>{
        let body = require('../test_resources/sampleTownCatagory.json');
        it('should return a list of town ids', (done)=>{
            chai.request(server)
                .post('/towns/categories')
                .set('content-type', 'application/json')
                .send(body)
                .end((err, res)=>{
                    should.not.exist(err);
                    should.exist(res);
                    res.should.have.status(201);
                    res.body.should.be.an('array')
                        .and.have.lengthOf(body.categories.length);
                    res.body[0].should.have.deep.property('uuid').and.be.a('string');
                    done();
                })
        })

        it('should return the new catagories in a get request', (done)=>{
            chai.request(server)
            .get('/towns/categories')
            .end((err, res)=>{
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.an('array')
                    .and.have.lengthOf(3);
                done();
            })
        })
    })
})