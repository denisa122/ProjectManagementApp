const User = require('../models/user');

const chai = require('chai')
const expect = chai.expect;
const should = chai.should();

const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('User tests', () => {
    let registeredUser;

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

    it ('should register a valid user', (done) => {
        let user = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@email.com',
            password: 'password'
        }
        
        chai.request(server)
            .post('/api/user/register')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                registeredUser = user;
                done();
            })
    });

    it ('should log in the registered user', (done) => {
    chai.request(server)
        .post('/api/user/login')
        .send({
            email: registeredUser.email,
            password: registeredUser.password
        })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('data');
            res.body.data.should.have.property('token');
            done();
        })
    });

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