const chai = require('chai')
const expect = chai.expect;
const should = chai.should();

const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('User tests', () => {
    // Maybe I don't need this
    it ('should verify that we have 0 users in the DB initially', (done) => {
        chai.request(server)
            .get('/api/users/')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eq(0);
                done();
            })
    });

    it ('should POST (register) a valid user', (done) => {
        let user = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'test@test.com',
            password: 'password'
        }
        
        chai.request(server)
            .post('/api/user/register')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });

    // Maybe I don't need this
    it ('should verify that we have 1 user in the DB', (done) => {
        chai.request(server)
            .get('/api/users/')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eq(1);
                done();
            })
    });
});