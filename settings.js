const dotenv = require('dotenv');
dotenv.config();
module.exports.testEnvironmentVariable = process.env.TEST_ENV_VARIABLE;