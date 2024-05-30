const chai = require("chai");
const expect = chai.expect;
const should = chai.should();

const chaiHttp = require("chai-http");
const server = require("../server");

chai.use(chaiHttp);

describe("Register & login tests", () => {
  let registeredUser;

  it("should register a valid user", (done) => {
    let user = {
      firstName: "Paul",
      lastName: "Smith",
      email: "paulsmith@email.com",
      password: "password",
    };

    chai
      .request(server)
      .post("/api/user/register")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        registeredUser = user;
        done();
      });
  });

  it("should log in the registered user", (done) => {
    chai
      .request(server)
      .post("/api/user/login")
      .send({
        email: registeredUser.email,
        password: registeredUser.password,
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        res.body.should.have.property("data");
        res.body.data.should.have.property("token");
        done();
      });
  });

  it("should not register an invalid user", (done) => {
    let user = {
      firstName: "Paul",
      lastName: "Smith",
      email: "paulsmith@test.com",
      password: "123",
    };

    chai
      .request(server)
      .post("/api/user/register")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);

        expect(res.body).to.be.a("object");
        expect(res.body.error).to.be.equal(
          '"password" length must be at least 8 characters long'
        );
        done();
      });
  });

  it("should not register a user with an existing email", (done) => {
    let user = {
      firstName: "Jens",
      lastName: "Jensen",
      email: "paulsmith@email.com",
      password: "password",
    };

    chai
      .request(server)
      .post("/api/user/register")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);

        expect(res.body).to.be.a("object");
        expect(res.body.error).to.be.equal("Email is already taken");
        done();
      });
  });

  it("should not log in an invalid user", (done) => {
    chai
      .request(server)
      .post("/api/user/login")
      .send({
        email: "email@test.com", // Invalid email
        password: "password",
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(400);

        expect(res.body).to.be.a("object");
        expect(res.body.error).to.be.equal("Incorrect email or password");
        done();
      });
  });

  it("should log in and then log out a user", (done) => {
    // Login the user
    chai
      .request(server)
      .post("/api/user/login")
      .send({
        email: registeredUser.email,
        password: registeredUser.password,
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        res.body.should.have.property("data");
        res.body.data.should.have.property("token");

        let token = res.body.data.token;

        // Logout the user
        chai
          .request(server)
          .post("/api/user/logout")
          .set("auth-token", token)
          .end((err, res) => {
            expect(res.status).to.be.equal(200);
            expect(res.body).to.be.a("object");
            expect(res.body.message).to.be.equal("Logged out successfully");

            done();
          });
      });
  });
});

describe("Login status tests", () => {
  it("should return isLoggedIn false when no token is provided", (done) => {
    chai
      .request(server)
      .get("/api/user/login-status")
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a("object");
        expect(res.body.isLoggedIn).to.be.false;

        done();
      });
  });

  it("should return isLoggedIn true when a valid token is provided", (done) => {
    // Login the user
    chai
      .request(server)
      .post("/api/user/login")
      .send({
        email: "paulsmith@email.com",
        password: "password",
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        res.body.should.have.property("data");
        res.body.data.should.have.property("token");

        let token = res.body.data.token;

        // Check login status
        chai
          .request(server)
          .get("/api/user/login-status")
          .set("auth-token", token)
          .end((err, res) => {
            expect(res.status).to.be.equal(200);
            expect(res.body).to.be.a("object");
            expect(res.body.isLoggedIn).to.be.true;
            expect(res.body).to.have.property("role");
            expect(res.body.role).to.be.equal("team member");
            expect(res.body).to.have.property("id");
            expect(res.body.id).to.be.a("string");

            done();
          });
      });
  });
});
