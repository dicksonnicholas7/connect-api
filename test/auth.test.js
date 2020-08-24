// //include dependencies
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const should = chai.should();
// chai.use(chaiHttp);
// const server = require('../app');


// //test function
// describe('Sign Up and Log in', () => {

//     describe('GET Sign Up', () => {
//         it('it should get the sign up page', (done) => {
//         chai.request(server)
//             .get('/signup')
//             .end((err, res) => {
//                   (res).should.have.status(200);
//                   done();
//                });
//             });
//         });

//  describe('/POST signup', () => {
//      it('it should create a user account', (done) => {
//      chai.request(server)
//        .post('/signup')
//        .send({                   
//         email: 'noxwillis@gmail.com',
//         password: "myPassword",
//         conpassword: "myPassword"})
//        .end((err, res) => {
//              (res).should.have.status(200);
//              (res.body).should.be.a('object');
//              done();
//           });
//        });
//   });


//   describe('GET Log in page', () => {
//     it('it should get the log in page', (done) => {
//     chai.request(server)
//         .get('/login')
//         .end((err, res) => {
//               (res).should.have.status(200);
//               done();
//            });
//         });
//     });




//   describe('/POST login', () => {
//     it('it should log a user into his/her account', (done) => {
//     chai.request(server)
//       .post('/login')
//       .send({                   
//        email: 'noxwillis@gmail.com',
//        password: "myPassword"})
//       .end((err, res) => {
//             (res).should.have.status(200);
//             (res.body).should.be.a('object');
//             done();
//          });
//       });
//  });

// });




// /** Below is the response for the test**/


// /**
//  * 
// Sign Up and Log in
// GET Sign Up
// GET /signup 200 12.225 ms - 14797
//   √ it should get the sign up page
// /POST signup
// Executing (default): CREATE TABLE IF NOT EXISTS `Roles` (`id` INTEGER NOT NULL auto_increment , `name` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
// Executing (default): SELECT `user_account_id`, `email`, `password`, `verified`, `first_time`, `blocked`, `token`, `email_hash`, `createdAt`, `updatedAt`, `role_id` FROM `UserAccounts` AS `UserAccount` WHERE `UserAccount`.`email` = 'noxwillis@gmail.com';
// Executing (default): SHOW INDEX FROM `Roles` FROM `connect_db`
// User already exists. Log in
// POST /signup 200 25.696 ms - 15115
//   √ it should create a user account
// Executing (default): CREATE TABLE IF NOT EXISTS `UserAccounts` (`user_account_id` CHAR(36) BINARY NOT NULL , `email` VARCHAR(255) UNIQUE, `password` VARCHAR(255), `verified` TINYINT(1), `first_time` TINYINT(1), `blocked` TINYINT(1), `token` VARCHAR(255), `email_hash` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `role_id` INTEGER, PRIMARY KEY (`user_account_id`), FOREIGN KEY (`role_id`) REFERENCES `Roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;
// GET Log in page
// Executing (default): SHOW INDEX FROM `UserAccounts` FROM `connect_db`
// Executing (default): CREATE TABLE IF NOT EXISTS `Certifications` (`id` INTEGER NOT NULL auto_increment , `name` VARCHAR(255), `filename` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `UserId` CHAR(36) BINARY, `user_account_id` CHAR(36) BINARY, PRIMARY KEY (`id`), FOREIGN KEY (`UserId`) REFERENCES `UserAccounts` (`user_account_id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`user_account_id`) REFERENCES `UserAccounts` (`user_account_id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;
// GET /login 200 4.941 ms - 14595
//   √ it should get the log in page
// Executing (default): SHOW INDEX FROM `Certifications` FROM `connect_db`
// /POST login
// Executing (default): SELECT `UserAccount`.`user_account_id`, `UserAccount`.`email`, `UserAccount`.`password`, `UserAccount`.`verified`, `UserAccount`.`first_time`, `UserAccount`.`blocked`, `UserAccount`.`token`, `UserAccount`.`email_hash`, `UserAccount`.`createdAt`, `UserAccount`.`updatedAt`, `UserAccount`.`role_id`, `User`.`id` AS `User.id`, `User`.`first_name` AS `User.first_name`, `User`.`last_name` AS `User.last_name`, `User`.`job_title` AS `User.job_title`, `User`.`availability` AS `User.availability`, `User`.`golden_paragraph` AS `User.golden_paragraph`, `User`.`gender` AS `User.gender`, `User`.`date_of_birth` AS `User.date_of_birth`, `User`.`country_code` AS `User.country_code`, `User`.`phone` AS `User.phone`, `User`.`country` AS `User.country`, `User`.`city` AS `User.city`, `User`.`picture` AS `User.picture`, `User`.`createdAt` AS `User.createdAt`, `User`.`updatedAt` AS `User.updatedAt`, `User`.`user_account_id` AS `User.user_account_id` FROM `UserAccounts` AS `UserAccount` LEFT OUTER JOIN `Users` AS `User` ON `UserAccount`.`user_account_id` = `User`.`user_account_id` WHERE `UserAccount`.`email` = 'noxwillis@gmail.com';
// Executing (default): CREATE TABLE IF NOT EXISTS `JobCategories` (`id` INTEGER NOT NULL auto_increment , `name` VARCHAR(255), `picture` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
// POST /login 200 11.672 ms - 45
//   √ it should log a user into his/her account
// Executing (default): SHOW INDEX FROM `JobCategories` FROM `connect_db`


// 4 passing (124ms)
//  * 
//  * 
//  * 
//  * * */