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
  });
});
