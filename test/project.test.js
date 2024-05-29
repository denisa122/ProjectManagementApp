const chai = require("chai");
const expect = chai.expect;
const should = chai.should();

const chaiHttp = require("chai-http");
const server = require("../server");
const jwt = require("jsonwebtoken");
const project = require("../models/project");

chai.use(chaiHttp);

describe("Project tests", () => {
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
});
