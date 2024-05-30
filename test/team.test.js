const chai = require("chai");
const expect = chai.expect;
const should = chai.should();

const chaiHttp = require("chai-http");
const server = require("../server");

chai.use(chaiHttp);

describe("Team tests", () => {
  let createdTeam;
  describe("Create team workflow test", () => {
    it("should register + login a user, and then create a new team", (done) => {
      // Register the user
      let user = {
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@email.com",
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
              email: "johndoe@email.com",
              password: "password",
            })
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res.body.error).to.be.equal(null);

              let token = res.body.data.token;

              // Create a new team
              let team = {
                name: "Test Team",
                teamLeader: "660ed75d2d875fa91fd1f853",
                members: [
                  "660ee3700d5f7cbf83aada7a",
                  "660ef08bad41f2608d0a0ee9",
                ],
              };

              chai
                .request(server)
                .post("/api/teams/")
                .set({ "auth-token": token })
                .send(team)
                .end((err, res) => {
                  expect(res.status).to.be.equal(200);
                  expect(res.body).to.be.a("array");
                  expect(res.body.length).to.be.eql(1);

                  createdTeam = res.body[0];

                  expect(createdTeam.name).to.be.equal(team.name);
                  expect(createdTeam.teamLeader).to.deep.equal(team.teamLeader);
                  expect(createdTeam.members).to.deep.equal(team.members);

                  // Verify one team in test DB
                  chai
                    .request(server)
                    .get("/api/teams/")
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
  });

  describe("Read team workflow test", () => {
    it("should login user, and then get the previously created team details", (done) => {
      // Login the user
      chai
        .request(server)
        .post("/api/user/login")
        .send({
          email: "johndoe@email.com",
          password: "password",
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.error).to.be.equal(null);

          let token = res.body.data.token;

          // Get the team details
          chai
            .request(server)
            .get(`/api/teams/${createdTeam._id}`)
            .set({ "auth-token": token })
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res.body).to.be.a("object");

              let teamDetails = res.body;

              expect(teamDetails.name).to.be.equal(createdTeam.name);
              // expect(teamDetails.teamLeader).to.deep.equal(createdTeam.teamLeader);
              // expect(team.members).to.deep.equal(createdTeam.members);

              done();
            });
        });
    });

    it("should login user, and then get all teams by team leader", (done) => {
      // Login the user
      chai
        .request(server)
        .post("/api/user/login")
        .send({
          email: "johndoe@email.com",
          password: "password",
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.error).to.be.equal(null);

          let token = res.body.data.token;

          // Get teams by team leader
          chai
            .request(server)
            .get(`/api/teams/leader/660ed75d2d875fa91fd1f853`)
            .set({ "auth-token": token })
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res.body).to.be.a("array");
              expect(res.body.length).to.be.eql(1);

              done();
            });
        });
    });

    it("should get a list of all teams", (done) => {
        chai.request(server)
        .get("/api/teams/")
        .end((err, res) => {
            expect(res.status).to.be.equal(200);
            expect(res.body).to.be.a("array");
            expect(res.body.length).to.be.eql(1);

            done();
        });
    });
  });

  describe("Update team workflow test", () => {
    it("should login user, and then update the team", (done) => {
      // Login the user
      chai
        .request(server)
        .post("/api/user/login")
        .send({
          email: "johndoe@email.com",
          password: "password",
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.error).to.be.equal(null);

          let token = res.body.data.token;

          // Update the team
          let updateData = {
            name: "Updated Test Team",
          };

          chai
            .request(server)
            .put(`/api/teams/${createdTeam._id}`)
            .set({ "auth-token": token })
            .send(updateData)
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res.body).to.be.a("object");

              let updatedTeam = res.body;

              expect(updatedTeam.name).to.be.equal(updateData.name);

              done();
            });
        });
    });

    it("should login user, and then add user to the previously created team", (done) => {
      // Login the user
      chai
        .request(server)
        .post("/api/user/login")
        .send({
          email: "johndoe@email.com",
          password: "password",
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.status).to.be.equal(200);
          expect(res.body.error).to.be.equal(null);

          let token = res.body.data.token;

          // Add user to the team
          chai
            .request(server)
            .post(
              `/api/teams/${createdTeam._id}/members/660ef08bad41f2608d0a0ef7`
            )
            .set({ "auth-token": token })
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res.body).to.be.a("object");

              done();
            });
        });
    });

    it("should login user, and then remove user from the previously created team", (done) => {
      // Login the user
      chai
        .request(server)
        .post("/api/user/login")
        .send({
          email: "johndoe@email.com",
          password: "password",
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.error).to.be.equal(null);

          let token = res.body.data.token;

          // Remove user from the team
          chai
            .request(server)
            .delete(
              `/api/teams/${createdTeam._id}/members/660ef08bad41f2608d0a0ef7`
            )
            .set({ "auth-token": token })
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res.body).to.be.a("object");

              done();
            });
        });
    });
  });

  describe("Delete team workflow test", () => {
    it("should login user, and then delete the previously created team", (done) => {
      // Login the user
      chai
        .request(server)
        .post("/api/user/login")
        .send({
          email: "johndoe@email.com",
          password: "password",
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.error).to.be.equal(null);

          let token = res.body.data.token;

          // Delete the team
          chai
            .request(server)
            .delete(`/api/teams/${createdTeam._id}`)
            .set({ "auth-token": token })
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res.body).to.be.a("object");
              expect(res.body.message).to.be.equal(
                "Team deleted successfully."
              );

              done();
            });
        });
    });
  });
});
