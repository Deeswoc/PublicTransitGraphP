const chai = require('chai');
const chathttp = require('chai-http');
const server = require('../../app');
const driver = require('../../config/database');
const towns = require('../test_resources/sampleTowns.json');

const should = chai.should();
chai.use(chathttp);

async function resetDB() {
  const session = driver.session();

  await session.writeTransaction((tx) => tx.run(
    `
        MATCH (n:Town)
        DETACH DELETE n
`,
  ));
}

describe('/towns', () => {
  before((done) => {
    console.log('Running test setup');
    resetDB();
    done();
  });

  after((done) => {
    console.log('Clearing DB');
    resetDB();
    done();
  });

  describe('GET', () => {
    it('should return an empty list of towns', (done) => {
      chai.request(server)
        .get('/towns')
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(200);
          res.body.should.be.an('array')
            .and.have.lengthOf(0);
          done();
        });
    });
  });

  describe('POST', () => {
    it('should return a list of town ids', (done) => {
      chai.request(server)
        .post('/towns')
        .set('content-type', 'application/json')
        .send(towns)
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(201);
          res.body.should.be.an('array')
            .and.have.lengthOf(towns.towns.length);
          res.body[0].should.have.deep.property('uuid').and.be.a('string');
          done();
        });
    });

    it('should return the new towns in a get request', (done) => {
      chai.request(server)
        .get('/towns')
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(200);
          res.body.should.be.an('array')
            .and.have.lengthOf(7);
          done();
        });
    });
  });
});
