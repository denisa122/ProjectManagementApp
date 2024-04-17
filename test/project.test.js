const chai = require('chai')
const expect = chai.expect;
const should = chai.should();

const chaiHttp = require('chai-http');
const server = require('../backend/server');
const project = require('../backend/models/project');

chai.use(chaiHttp);

describe ('Project tests', () => {
    
    // POST Create project
    describe ('Create project workflow test', () => {
        this.timeout(15000);
        it ('should register + login user, and then create a new project', (done) => {          
            // Register the user
            let user = {
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'jane@email.com',
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
                    email: 'jane@email.com',
                    password: 'password'
                })
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body.error).to.be.equal(null);
    
                    let token = res.body.data.token;

                    // Create a new project
                    let project = {
                        name: "Test Project",
                        description: "This is a test project",
                        startDate: "2021-01-01T00:00:00.000Z",
                        endDate: "2021-12-31T00:00:00.000Z",
                        projectStatus: "Not started",
                        team: ["66102f526329d03cb81c1ea8"],
                        currentSprint: "66102f526329d03cb81c1ea8",
                        tasks: ["66102f526329d03cb81c1ea8", "66102f526329d03cb81c1ea8", "66102f526329d03cb81c1ea8"]
                    };

                    chai.request(server)
                    .post('/api/projects/')
                    .set({ "auth-token": token })
                    .send(project)
                    .end ((err, res) => {
                        expect(res.status).to.be.equal(201);
                        expect(res.body).to.be.a('object');
                        
                        let savedProject = res.body;

                        expect(savedProject.name).to.be.equal(project.name);
                         expect(savedProject.description).to.be.equal(project.description);
                         expect(savedProject.startDate).to.be.equal(project.startDate);
                         expect(savedProject.endDate).to.be.equal(project.endDate);
                         expect(savedProject.projectStatus).to.be.equal(project.projectStatus);
                         expect(savedProject.team).to.deep.eql(project.team);
                         expect(savedProject.currentSprint).to.deep.eql(project.currentSprint);
                         expect(savedProject.tasks).to.deep.eql(project.tasks);

                        // Verify one project in test DB
                        chai.request(server)
                        .get('/api/projects/')
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