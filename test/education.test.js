// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const should = chai.should();
// chai.use(chaiHttp);
// const server = require('../app');
// const request = require("supertest");
// const fs = require('fs')


// describe("Add Education", () => {
//   it("it should add an education entry for the user", (done) => {
//     request(server)
//       .post("/user/add-education")
//       .field("Content-Type", "multipart/form-data")
//       .field("id", "ad3e0429-fd1c-442a-8d95-0a07f3269741")
//       .field("degree", "Masters Degree")
//       .field("program", "Social Science")
//       .field("grade", "3.8")
//       .field("university", "University of Mines")
//       .field("edu_country", "Ghana")
//       .field("start_date", "1990-08-10")
//       .field("end_date", "1994-08-10")
//       .field("project", "www;.myproject.com")
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
