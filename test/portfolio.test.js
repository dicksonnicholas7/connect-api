// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const should = chai.should();
// chai.use(chaiHttp);
// const server = require('../app');
// const request = require("supertest");
// const path = require("path");
// const fs = require('fs')


// describe("Add Portfolio", () => {
//   it("it should add a portfolio entry", (done) => {
//     request(server)
//       .post("/user/add-portfolio")
//       .field("Content-Type", "multipart/form-data")
//       .field("id", "ad3e0429-fd1c-442a-8d95-0a07f3269741")
//       .field("cert_name", "NIIT")
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

