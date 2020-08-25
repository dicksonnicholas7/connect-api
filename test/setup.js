const supertest = require('supertest');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const app = require('../app');

chai.use(sinonChai);
module.exports.expect = chai.expect;
module.exports.server= supertest.agent(app);
module.exports.BASE_URL  = '/api/v1';