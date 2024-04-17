const chai = require('chai')
const expect = chai.expect;
const should = chai.should();

const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe ('Team tests', () => {
    
    // POST Create team
    describe ('Create team workflow test', () => {
        it ('should register + login a user, and then create a new team', (done) => {
        
            // Register the user
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
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.equal(null);
    
                // Login the user
                chai.request(server)
                .post('/api/user/login')
                .send({
                    email: 'johndoe@email.com',
                    password: 'password'
                })
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body.error).to.be.equal(null);
    
                    let token = res.body.data.token;
    
                    // Create a new team
                    let team = {
                        name: "Test Team",
                        teamLeader: "660ed75d2d875fa91fd1f853",
                        members: ["660ee3700d5f7cbf83aada7a", "660ef08bad41f2608d0a0ee9"]
                    };
    
                    chai.request(server)
                    .post('/api/teams/')
                    .set({ "auth-token": token })
                    .send(team)
                    .end((err, res) => {
                        expect(res.status).to.be.equal(200);
                        expect(res.body).to.be.a('array');
                        expect(res.body.length).to.be.eql(1);
    
                        let savedTeam = res.body[0];
    
                        expect(savedTeam.name).to.be.equal(team.name);
                        expect(savedTeam.teamLeader).to.deep.equal(team.teamLeader);
                        expect(savedTeam.members).to.deep.equal(team.members);
    
                        // Verify one team in test DB
                        chai.request(server)
                        .get('/api/teams/')
                        .end((err, res) => {
                            expect(res.status).to.be.equal(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).to.be.eql(1);
    
                            done();
                        });
                    });
                });
    
            });
        });
    });
});