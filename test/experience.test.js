// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const should = chai.should();
// chai.use(chaiHttp);
// const server = require('../app');
// const request = require("supertest");
// const path = require("path");
// const fs = require('fs')


// describe("Add Experience", () => {
//   it("it should add an experience entry", (done) => {
//     request(server)
//       .post("/user/update-experience")
//       .field("Content-Type", "multipart/form-data")
//       .field("id", "ad3e0429-fd1c-442a-8d95-0a07f3269741")
//       .field("position", "Team Lead")
//       .field("company", "Amalitech Services")
//       .field("exp_country", "Germany")
//       .field("exp_city", "Cologne")
//       .field("exp_start_date", "2020-12-10")
//       .field("exp_end_date", "2024-12-10")
//       .field("responsibilities", "i was in charge of development operations")
//       .attach("file", fs.readFileSync("test/test/test.jpg"))
//       .expect(200)
//       .end(function(err, res) {
//         if (err) {
//           throw err;
//         }
//         done();
//       });
//   });
// });

