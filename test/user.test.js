const chai = require("chai");
const expect = chai.expect;
const should = chai.should();

const chaiHttp = require("chai-http");
const server = require("../server");
const jwt = require("jsonwebtoken");

chai.use(chaiHttp);

describe("User tests", () => {
  let createdUserId;
  describe("Update user workflow test", () => {
    it("should register + login user, and then update user details", (done) => {
      // Register the user
      let user = {
        firstName: "Test",
        lastName: "User",
        email: "testuser@email.com",
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

          createdUserId = res.body.data._id;

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

              // Update the user
              let updatedData = {
                firstName: "First Updated",
                lastName: "Last Updated",
              };
              chai
                .request(server)
                .put(`/api/users/${createdUserId}`)
                .set("auth-token", token)
                .send(updatedData)
                .end((err, res) => {
                  expect(res.status).to.be.equal(200);
                  expect(res.body).to.be.a("object");
                  expect(res.body).to.have.property("message");
                  expect(res.body.message).to.be.equal(
                    "User was updated successfully."
                  );

                  let updatedUser = res.body.userUpdated;

                  expect(updatedUser.firstName).to.be.equal(
                    updatedData.firstName
                  );
                  expect(updatedUser.lastName).to.be.equal(
                    updatedData.lastName
                  );

                  done();
                });
            });
        });
    });
    it("should return 403 when trying to update another user", (done) => {
      // Login the user
      chai
        .request(server)
        .post("/api/user/login")
        .send({
          email: "testuser@email.com",
          password: "password",
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.error).to.be.equal(null);

          const token = res.body.data.token;

          // Another userId than the logged in user's id
          const userId = "662001ea5a893e002dedd1e5";

          const updatedData = {
            firstName: "First Name Updated",
            lastName: "Last  NameUpdated",
          };

          // Update the user
          chai
            .request(server)
            .put(`/api/users/${userId}`)
            .set("auth-token", token)
            .send(updatedData)
            .end((err, res) => {
              expect(res.status).to.be.equal(403);
              expect(res.body).to.be.a("object");
              expect(res.body).to.have.property("message");
              expect(res.body.message).to.be.equal(
                "You are not authorized to access this resource"
              );

              done();
            });
        });
    });
  });

  describe("Read user details workflow test", () => {
    it("should login the user created in the previous test, and then read user details", (done) => {
      // Login the user
      chai
        .request(server)
        .post("/api/user/login")
        .send({
          email: "testuser@email.com",
          password: "password",
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.error).to.be.equal(null);

          let token = res.body.data.token;

          // Read the user
          chai
            .request(server)
            .get(`/api/users/${createdUserId}`)
            .set("auth-token", token)
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res.body).to.be.a("object");
              expect(res.body).to.have.property("firstName");
              expect(res.body).to.have.property("lastName");
              expect(res.body).to.have.property("email");
              expect(res.body).to.have.property("role");

              done();
            });
        });
    });
  });

  describe("Delete user workflow test", () => {
    let token;
    let userId;
    it("should register+login a user, and then delete the user successfully", (done) => {
      // Register the user
      let user = {
        firstName: "Jessica",
        lastName: "Smith",
        email: "jessicasmith@email.com",
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

              token = res.body.data.token;
              let decode = jwt.decode(token);
              userId = decode.id;

              // Delete the user
              chai
                .request(server)
                .delete(`/api/users/${userId}`)
                .set("auth-token", token)
                .end((err, res) => {
                  expect(res.status).to.be.equal(200);
                  expect(res.body).to.be.a("object");
                  expect(res.body).to.have.property("message");
                  expect(res.body.message).to.be.equal(
                    "User was deleted successfully."
                  );

                  done();
                });
            });
        });
    });

    it("should return 404 when trying to delete a non-existing user", (done) => {
      chai
        .request(server)
        .delete(`/api/users/${userId}`)
        .set("auth-token", token)
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          expect(res.body).to.be.a("object");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.be.equal(
            "Cannot delete user. User not found."
          );

          done();
        });
    });

    it("should return 404 when trying to update a non-existing user", (done) => {
      updatedData = {
        firstName: "First Name Updated",
        lastName: "Last Name Updated",
      };

      chai
        .request(server)
        .put(`/api/users/${userId}`)
        .set("auth-token", token)
        .send(updatedData)
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          expect(res.body).to.be.a("object");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.be.equal(
            "Cannot update user. User not found."
          );

          done();
        });
    });
  });
});
