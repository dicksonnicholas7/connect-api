const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);
const server = require('../app');
const request = require("supertest");
const path = require("path");
const fs = require('fs')


describe("Update Profile", () => {
  it("it should update user personal details", (done) => {
    request(server)
      .post("/user/update-profile")
      .field("Content-Type", "multipart/form-data")
      .field("id", "a434a1e8-72e1-4170-be9b-2042a0372266")
      .field("firstname", "user")
      .field("lastname", "two")
      .field("jobtitle", "designer")
      .field("availability", "Fulle-Time")
      .field("golden_paragraph", "I am an assiduous developer")
      .field("date_of_birth", "1991-08-10")
      .field("gender", "male")
      .field("city", "Accra")
      .field("country_code", "Ghana")
      .field("phone", "963014311354")
      .field("email", "")
      .attach("picture", "C:/Users/AMALITECH-PC/Documents/amalitech projects/connect-app/Connect-App/public/images/users/individual/test.jpg")
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        done();
      });
  });
});

