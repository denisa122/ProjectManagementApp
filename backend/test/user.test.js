const chai = require('chai')
const expect = chai.expect;
const should = chai.should();

const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('Register & login tests', () => {
    let registeredUser;
    
    // POST Register user    
    it ('should register a valid user', (done) => {
            let user = {
                firstName: 'Paul',
                lastName: 'Smith',
                email: 'paulsmith@email.com',
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

    // POST Login user
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
});