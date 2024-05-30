const chai = require("chai");
const expect = chai.expect;
const should = chai.should();

const chaiHttp = require("chai-http");
const server = require("../server");
const jwt = require("jsonwebtoken");

chai.use(chaiHttp);

describe("Task tests", () => {
  let createdProjectId;
  let createdTaskId;
  describe("Create task workflow test", () => {
    it("should register + login user, and then create a new project and a new task for the project", (done) => {
      // Register the user
      let user = {
        firstName: "John",
        lastName: "Johnson",
        email: "johnjohnson@email.com",
        password: "password",
      };
      chai
        .request(server)
        .post("/api/user/register")
        .send(user)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.be.a("object");
          expect(res.body.error).to.be.equal(null);

          // Login the user
          chai
            .request(server)
            .post("/api/user/login")
            .send({
              email: user.email,
              password: user.password,
            })
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res.body.error).to.be.equal(null);

              let token = res.body.data.token;
              let decoded = jwt.decode(token);
              let userId = decoded.id;

              // Create a new project
              let project = {
                name: "Project",
                description: "Project description",
                startDate: new Date(),
                endDate: new Date(),
                projectStatus: "In progress",
                team: ["66102f526329d03cb81c1ea8"],
                teamLeader: userId,
                tasks: [],
              };
              chai
                .request(server)
                .post("/api/projects/")
                .set("auth-token", token)
                .send(project)
                .end((err, res) => {
                  expect(res.status).to.be.equal(201);
                  expect(res.body).to.be.a("object");

                  let savedProject = res.body;
                  createdProjectId = savedProject._id;

                  // Create a task
                  let task = {
                    name: "Task",
                    number: 1,
                    description: "Task description",
                    startDate: new Date(),
                    taskStatus: "To do",
                    projectId: createdProjectId,
                  };
                  chai
                    .request(server)
                    .post(`/api/tasks/${createdProjectId}`)
                    .set("auth-token", token)
                    .send(task)
                    .end((err, res) => {
                      expect(res.status).to.be.equal(201);
                      expect(res.body).to.be.a("object");

                      let savedTask = res.body;
                      createdTaskId = savedTask._id;

                      expect(savedTask.name).to.be.equal(task.name);
                      expect(savedTask.number).to.be.equal(task.number);
                      expect(savedTask.description).to.be.equal(
                        task.description
                      );
                      expect(savedTask.startDate).to.be.equal(
                        task.startDate.toISOString()
                      );
                      expect(savedTask.taskStatus).to.be.equal(task.taskStatus);
                      expect(savedTask.projectId).to.be.equal(task.projectId);

                      // Verify the task is saved in the project
                      chai
                        .request(server)
                        .get(`/api/projects/${createdProjectId}`)
                        .set("auth-token", token)
                        .end((err, res) => {
                          expect(res.status).to.be.equal(200);
                          expect(res.body).to.be.a("object");

                          let project = res.body;

                          expect(project.tasks).to.be.an("array");
                          expect(project.tasks.length).to.be.equal(1);
                        });

                      done();
                    });
                });
            });
        });
    });
  });

  describe("Read task workflow test", () => {
    it("should login a user, and then get all tasks for the project created in the previous test", (done) => {
      // Login the user
      chai
        .request(server)
        .post("/api/user/login")
        .send({
          email: "johnjohnson@email.com",
          password: "password",
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.error).to.be.equal(null);

          let token = res.body.data.token;

          // Get all tasks for the project
          chai
            .request(server)
            .get(`/api/tasks/${createdProjectId}`)
            .set("auth-token", token)
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res.body).to.be.an("array");

              let tasks = res.body;
              expect(tasks.length).to.be.equal(1);

              done();
            });
        });
    });

    it("should login a user, and then get the task details for the task created in the previous test", (done) => {
      // Login the user
      chai
        .request(server)
        .post("/api/user/login")
        .send({
          email: "johnjohnson@email.com",
          password: "password",
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.error).to.be.equal(null);

          let token = res.body.data.token;

          // Get task details
          chai
            .request(server)
            .get(`/api/tasks/project/${createdProjectId}/task/${createdTaskId}`)
            .set("auth-token", token)
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res.body).to.be.a("object");

              let taskDetails = res.body;

              expect(taskDetails.task).to.be.a("object");
              expect(taskDetails.project).to.be.a("object");

              done();
            });
        });
    });
  });

  describe("Update task workflow test", () => {
    it("should login a user, and then update the task created in the previous test", (done) => {
      // Login the user
      chai
        .request(server)
        .post("/api/user/login")
        .send({
          email: "johnjohnson@email.com",
          password: "password",
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.error).to.be.equal(null);

          let token = res.body.data.token;

          // Update the task
          let updatedData = {
            name: "Updated task",
            number: 2,
            description: "Updated task description",
            startDate: new Date(),
            taskStatus: "In progress",
          };
          chai
            .request(server)
            .put(`/api/tasks/${createdProjectId}/task/${createdTaskId}`)
            .set("auth-token", token)
            .send(updatedData)
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res.body).to.be.a("object");

              let updatedTask = res.body;
              expect(updatedTask.name).to.be.equal(updatedData.name);
              expect(updatedTask.number).to.be.equal(updatedData.number);
              expect(updatedTask.description).to.be.equal(
                updatedData.description
              );
              expect(updatedTask.startDate).to.be.equal(
                updatedData.startDate.toISOString()
              );
              expect(updatedTask.taskStatus).to.be.equal(
                updatedData.taskStatus
              );

              done();
            });
        });
    });

    it("should login a user, and then assign a team member to the task created in the previous test", (done) => {
      // Login the user
      chai
        .request(server)
        .post("/api/user/login")
        .send({
          email: "johnjohnson@email.com",
          password: "password",
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.error).to.be.equal(null);

          let token = res.body.data.token;

          // Assign a team member to the task
          let teamMemberId = "66102f526329d03cb81c1ea8";
          chai
            .request(server)
            .put(`/api/tasks/${createdTaskId}/assign`)
            .set("auth-token", token)
            .send({ teamMemberId })
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res.body).to.be.a("object");

              let updatedTask = res.body;
              expect(updatedTask.assignedTeamMember).to.be.an("array");
              expect(updatedTask.assignedTeamMember).to.include(teamMemberId);
              expect(updatedTask.taskStatus).to.be.equal("In progress");

              done();
            });
        });
    });

    it("should login a user, and then unassign a team member from the task created in the previous test", (done) => {
      // Login the user
      chai
        .request(server)
        .post("/api/user/login")
        .send({
          email: "johnjohnson@email.com",
          password: "password",
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.error).to.be.equal(null);

          let token = res.body.data.token;

          // Unassign a team member from the task
          chai
            .request(server)
            .put(`/api/tasks/${createdTaskId}/unassign`)
            .set("auth-token", token)
            .send()
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res.body).to.be.a("object");

              let updatedTask = res.body;
              expect(updatedTask.assignedTeamMember).to.be.equal(null);
              expect(updatedTask.taskStatus).to.be.equal("To do");

              done();
            });
        });
    });
  });

  describe("Delete task workflow test", () => {
    it("should login a user, and then delete the task created in the previous test", (done) => {
      // Login the user
      chai
        .request(server)
        .post("/api/user/login")
        .send({
          email: "johnjohnson@email.com",
          password: "password",
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.error).to.be.equal(null);

          let token = res.body.data.token;

          // Delete the task
          chai
            .request(server)
            .delete(`/api/tasks/${createdTaskId}`)
            .set("auth-token", token)
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res.body).to.be.a("object");
              expect(res.body.message).to.be.equal(
                "Task deleted successfully."
              );

              done();
            });
        });
    });
  });
});
