const chai = require("chai");
const expect = chai.expect;
const should = chai.should();

const chaiHttp = require("chai-http");
const server = require("../server");
const jwt = require("jsonwebtoken");

chai.use(chaiHttp);

describe("Project tests", () => {
  let createdProjectId;
  describe("Create project workflow test", () => {
    it("should register + login user, and then create a new project without template", (done) => {
      // Register the user
      let user = {
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@email.com",
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
              email: "jane@email.com",
              password: "password",
            })
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res.body.error).to.be.equal(null);

              let token = res.body.data.token;
              let decoded = jwt.decode(token);
              let userId = decoded.id;

              // Create a new project
              let project = {
                name: "Test Project",
                description: "This is a test project",
                startDate: "2021-01-01T00:00:00.000Z",
                endDate: "2021-12-31T00:00:00.000Z",
                projectStatus: "Not started",
                team: ["66102f526329d03cb81c1ea8"],
                teamLeader: userId,
                tasks: [
                  "66102f526329d03cb81c1ea8",
                  "66102f526329d03cb81c1ea8",
                  "66102f526329d03cb81c1ea8",
                ],
              };

              chai
                .request(server)
                .post("/api/projects/")
                .set({ "auth-token": token })
                .send(project)
                .end((err, res) => {
                  expect(res.status).to.be.equal(201);
                  expect(res.body).to.be.a("object");

                  let savedProject = res.body;
                  createdProjectId = savedProject._id;

                  expect(savedProject.name).to.be.equal(project.name);
                  expect(savedProject.description).to.be.equal(
                    project.description
                  );
                  expect(savedProject.startDate).to.be.equal(project.startDate);
                  expect(savedProject.endDate).to.be.equal(project.endDate);
                  expect(savedProject.projectStatus).to.be.equal(
                    project.projectStatus
                  );
                  expect(savedProject.team).to.deep.eql(project.team);
                  expect(savedProject.teamLeader).to.be.equal(
                    project.teamLeader
                  );
                  expect(savedProject.tasks).to.deep.eql(project.tasks);

                  // Verify one project in test DB
                  chai
                    .request(server)
                    .get(`/api/projects/users/${userId}`)
                    .set({ "auth-token": token })
                    .end((err, res) => {
                      expect(res.status).to.be.equal(200);
                      expect(res.body).to.be.a("array");
                      expect(res.body.length).to.be.eql(1);

                      done();
                    });
                });
            });
        });
    });

    it("should login user + create a new project template and then create a new project with that template", (done) => {
      // Login the user
      chai
        .request(server)
        .post("/api/user/login")
        .send({
          email: "jane@email.com",
          password: "password",
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.error).to.be.equal(null);

          let token = res.body.data.token;
          let decoded = jwt.decode(token);
          let userId = decoded.id;

          // Create a new project template
          let template = {
            name: "Test Project",
            description: "This is a test project",
            startDate: "2021-01-01T00:00:00.000Z",
            endDate: "2021-12-31T00:00:00.000Z",
            projectStatus: "Not started",
            team: ["66102f526329d03cb81c1ea8"],
            tasks: [
              "66102f526329d03cb81c1ea8",
              "66102f526329d03cb81c1ea8",
              "66102f526329d03cb81c1ea8",
            ],
          };

          chai
            .request(server)
            .post("/api/projects/templates")
            .send(template)
            .end((err, res) => {
              expect(res.status).to.be.equal(201);
              expect(res.body).to.be.a("object");

              let savedTemplate = res.body;
              let templateId = savedTemplate._id;

              // Create a new project using the template
              let project = {
                templateId: templateId,
              };

              chai
                .request(server)
                .post("/api/projects/")
                .set({ "auth-token": token })
                .send(project)
                .end((err, res) => {
                  expect(res.status).to.be.equal(201);
                  expect(res.body).to.be.a("object");

                  let savedProject = res.body;

                  expect(savedProject.name).to.be.equal(template.name);
                  expect(savedProject.description).to.be.equal(
                    template.description
                  );
                  expect(savedProject.startDate).to.be.equal(
                    template.startDate
                  );
                  expect(savedProject.endDate).to.be.equal(template.endDate);
                  expect(savedProject.projectStatus).to.be.equal(
                    template.projectStatus
                  );
                  expect(savedProject.team).to.deep.eql(template.team);
                  expect(savedProject.tasks).to.deep.eql(template.tasks);

                  // Verify two projects in test DB; one from the test before and one from this test
                  chai
                    .request(server)
                    .get(`/api/projects/users/${userId}`)
                    .set({ "auth-token": token })
                    .end((err, res) => {
                      expect(res.status).to.be.equal(200);
                      expect(res.body).to.be.a("array");
                      expect(res.body.length).to.be.eql(2);

                      done();
                    });
                });
            });
        });
    });
  });

  describe("Update project workflow test", () => {
    it("should login user + edit the project created in the previous test", (done) => {
      // Login the user
      chai
        .request(server)
        .post("/api/user/login")
        .send({
          email: "jane@email.com",
          password: "password",
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.error).to.be.equal(null);

          let token = res.body.data.token;

          // Update data for the project
          let updatedData = {
            name: "Updated Test Project",
            description: "This is an updated test project",
            startDate: "2021-01-01T00:00:00.000Z",
            endDate: "2021-12-31T00:00:00.000Z",
            projectStatus: "In progress",
          };

          // Retrieve the projectId from the previously created project
          let projectId = createdProjectId;

          chai
            .request(server)
            .put(`/api/projects/${projectId}`)
            .set({ "auth-token": token })
            .send(updatedData)
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res.body).to.be.a("object");

              let updatedProject = res.body;

              expect(updatedProject.name).to.be.equal(updatedData.name);
              expect(updatedProject.description).to.be.equal(
                updatedData.description
              );
              expect(updatedProject.startDate).to.be.equal(
                updatedData.startDate
              );
              expect(updatedProject.endDate).to.be.equal(updatedData.endDate);
              expect(updatedProject.projectStatus).to.be.equal(
                updatedData.projectStatus
              );

              done();
            });
        });
    });
  });

  describe("Read project workflow test", () => {
    it("should login user + retrieve the project created in a previous test", (done) => {
      let projectId = createdProjectId;

      // Login the user
      chai
        .request(server)
        .post("/api/user/login")
        .send({
          email: "jane@email.com",
          password: "password",
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.error).to.be.equal(null);

          let token = res.body.data.token;

          // Get project details by ID
          chai
            .request(server)
            .get(`/api/projects/${projectId}`)
            .set({ "auth-token": token })
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res.body).to.be.a("object");

              let project = res.body;

              expect(project._id).to.be.equal(projectId);

              done();
            });
        });
    });

    it("should login user + retrieve all projects for the user created in a previous test", (done) => {
      // Login the user
      chai
        .request(server)
        .post("/api/user/login")
        .send({
          email: "jane@email.com",
          password: "password",
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.error).to.be.equal(null);

          let token = res.body.data.token;
          let decoded = jwt.decode(token);
          let userId = decoded.id;

          // Get all projects for user
          chai
            .request(server)
            .get(`/api/projects/users/${userId}`)
            .set({ "auth-token": token })
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res.body).to.be.a("array");

              let projects = res.body;

              expect(projects.length).to.be.equal(2);

              done();
            });
        });
    });

    it("should login user + retrieve all projects for the team with specified ID", (done) => {
      // Login the user
      chai
        .request(server)
        .post("/api/user/login")
        .send({
          email: "jane@email.com",
          password: "password",
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.error).to.be.equal(null);

          let token = res.body.data.token;

          // Get all projects for team
          chai
            .request(server)
            .get(`/api/projects/team/66102f526329d03cb81c1ea8`)
            .set({ "auth-token": token })
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res.body).to.be.a("array");

              let projects = res.body;

              expect(projects.length).to.be.equal(2);

              done();
            });
        });
    });
  });

  describe("Delete project workflow test", () => {
    it("should login user + delete the project created in a previous test", (done) => {
      // Login the user
      chai
        .request(server)
        .post("/api/user/login")
        .send({
          email: "jane@email.com",
          password: "password",
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.error).to.be.equal(null);

          let token = res.body.data.token;

          // Retrieve the projectId from the previously created project
          let projectId = createdProjectId;

          chai
            .request(server)
            .delete(`/api/projects/${projectId}`)
            .set({ "auth-token": token })
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res.body).to.be.a("object");
              expect(res.body.message).to.be.equal(
                "Project deleted successfully."
              );

              done();
            });
        });
    });
  });
});
