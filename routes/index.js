var express = require('express');
var router = express.Router();

const {DoSignUp} = require('../controllers/Auth/SignUp');
const {GetUserTypes} = require('../controllers/Utilities/UserType');
const {DoVerification} = require('../controllers/Auth/Verify');
const {DoLogin} = require('../controllers/Auth/Login');
const {forgotPasswordEmail, VerifyLink, DoResetPassword} = require('../controllers/Auth/ForgotPassword');

//GET requests
router.get('/usertypes', GetUserTypes);
router.get('/verify-link/:token/:email', VerifyLink);


//POST requests
router.post('/signup', DoSignUp);
router.post('/verify', DoVerification);
router.post('/login', DoLogin);
router.post('/forgot-password', forgotPasswordEmail);
router.post('/reset-password', DoResetPassword);

module.exports = router;
