const chai = require('chai')
const expect = chai.expect;
const should = chai.should();

const chaiHttp = require('chai-http');
const server = require('../backend/server');

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
                    expect(res.status).to.be.equal(200);
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
            expect(res.status).to.be.equal(200);
            res.body.should.have.property('data');
            res.body.data.should.have.property('token');
            done();
        })
    });
    
    it ('should not register an invalid user', (done) => {
        let user = {
            firstName: 'Paul',
            lastName: 'Smith',
            email: 'paulsmith@test.com',
            password: '123'
        }
        
        chai.request(server)
            .post('/api/user/register')
            .send(user)
            .end((err, res) => {
                expect(res.status).to.be.equal(400);

                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.equal('\"password\" length must be at least 8 characters long');
                done();
            });
    });

    it ('should not register a user with an existing email', (done) => {
        let user = {
            firstName: 'Jens',
            lastName: 'Jensen',
            email: 'paulsmith@email.com',
            password: 'password'
        }

        chai.request(server)
            .post('/api/user/register')
            .send(user)
            .end((err, res) => {
                expect(res.status).to.be.equal(400);

                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.equal('Email is already taken');
                done();
            });
    });

    it ('should not log in an invalid user', (done) => {
        chai.request(server)
            .post('/api/user/login')
            .send({
                email: 'email@test.com',
                password: 'password'
            })
            .end((err, res) => {
                expect(res.status).to.be.equal(400);

                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.equal('Incorrect email or password');
                done();
            });
    });

    // DELETE User
    // it ('should delete the registered user', (done) => {
    //     let userId; 

    //     // Register the user
    //     let userToDelete = {
    //         firstName: 'Paul',
    //         lastName: 'Paulsen',
    //         email: 'paulpaulsen@email.com',
    //         password: 'password'
    //     }

    //     chai.request(server)
    //         .post('/api/user/register')
    //         .send(userToDelete)
    //         .end((err, res) => {
    //             expect(res.status).to.be.equal(200);
                
    //             userId = res.body.data._id;

    //             // Login the user
    //             chai.request(server)
    //                 .post('/api/user/login')
    //                 .send({
    //                     email: 'paulpaulsen@email.com',
    //                     password: 'password'
    //                 })
    //                 .end((err, res) => {
    //                     expect(res.status).to.be.equal(200);
    //                     expect(res.body.error).to.be.equal(null);

    //                     let token = res.body.data.token;

    //                     chai.request(server)
    //                         .delete('/api/user/' + userId)
    //                         .set({'auth-token': token})
    //                         .end((err, res) => {
    //                             expect(res.status).to.be.equal(200);
    //                             done();
    //                         });
    //                 });
    //         });
    // });
});