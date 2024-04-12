// const chai = require('chai')
// const expect = chai.expect;
// const should = chai.should();

// const chaiHttp = require('chai-http');
// const server = require('../server');
// const project = require('../models/project');
// const { number } = require('joi');

// chai.use(chaiHttp);

// describe ('Task tests', () => {
//     describe ('Create task workflow test', () => {
//         it ('should register + login user, and then create a new task', (done) => {
//             // Register the user
//             let user = {
//                 firstName: 'Jane',
//                 lastName: 'Doe',
//                 email: 'jane@email.com',
//                 password: 'password'
//             }
//             chai.request(server)
//             .post('/api/user/register')
//             .send(user)
//             .end((err, res) => {
//                 expect(res.status).to.be.equal(200);
//                 expect(res.body).to.be.a('object');
//                 expect(res.body.error).to.be.equal(null);

//                 // Login the user
//                 chai.request(server)
//                 .post('/api/user/login')
//                 .send({
//                     email: 'jane@email.com',
//                     password: 'password'
//                 })
//                 .end((err, res) => {
//                     expect(res.status).to.be.equal(200);
//                     expect(res.body.error).to.be.equal(null);
    
//                     let token = res.body.data.token;

//                     // Create a new task
//                     let task = {
//                         name: "Test Task",
//                         number: 1,
//                         description: "This is a test task",
//                         startDate: "2021-01-01T00:00:00.000Z",
//                         taskStatus: "To do",
//                         projectId: "66102f526329d03cb81c1ea8",
//                         assignedTeamMember: "66102f526329d03cb81c1ea8",
//                         attachments: ["66102f526329d03cb81c1ea8"]
//                     };

//                     chai.request(server)
//                     .post(`/api/projects/${task.projectId}/tasks/`)
//                     .set({ "auth-token": token })
//                     .send(task)
//                     .end ((err, res) => {
//                         expect(res.status).to.be.equal(201);
//                         expect(res.body).to.be.a('object');
                        
//                         let savedTask = res.body;

//                         expect(savedTask.name).to.be.equal(task.name);
//                         expect(savedTask.number).to.be.equal(task.number);
//                          expect(savedTask.description).to.be.equal(task.description);
//                          expect(savedTask.startDate).to.be.equal(task.startDate);
//                          expect(savedTask.taskStatus).to.be.equal(task.taskStatus);
//                          expect(savedTask.projectId).to.deep.eql(task.projectId);
//                          expect(savedTask.assignedTeamMember).to.deep.eql(task.assignedTeamMember);
//                          expect(savedTask.attachments).to.deep.eql(task.attachments);

//                         // Verify one task in test DB
//                         chai.request(server)
//                         .get(`/api/projects/${task.projectId}/tasks/`)
//                         .end((err, res) => {
//                             expect(res.status).to.be.equal(200);
//                             expect(res.body).to.be.a('array');
//                             expect(res.body.length).to.be.eql(1);

//                             done();
//                         });
//                     });
//                 });
//             });
//         });
//     });
// });