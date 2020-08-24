var express = require('express');
var router = express.Router();

const {UpdatePassword} = require('../controllers/Profile/Password');
const {UpdateProfileUser, UpdateProfileBusiness} = require('../controllers/Profile/Profile');
const {AddEducation, UpdateEducation} = require('../controllers/Profile/Education');
const {AddPortfolioUser, AddPortfolioBusiness, UpdatePortfolioBusiness, UpdatePortfolioUser} = require('../controllers/Profile/Portfolio');
const {AddSkillUser, AddSkillBusiness, UpdateSkillUser, UpdateSkillBusiness} = require('../controllers/Profile/Skills');
const {UpdateQualification, AddQualification} = require('../controllers/Profile/Qualification');
const {DoPostJob} = require('../controllers/Job/PostJob');
const {UpdateJob, DeleteJob} = require('../controllers/Job/UpdateJob');
const {GetAllUserSkills} = require('../controllers/Profile/Skills');
const {GetUserQualifications} = require('../controllers/Profile/Qualification');
const {GetUserPortfolios} = require('../controllers/Profile/Portfolio');
const {GetUserProfile} = require('../controllers/Profile/Profile');
const {GetAllJobsFreelancer, ApplyJob, GetAllFreelancerJobs, GetJobsFilterFreel, GetAppliedJobs} = require('../controllers/Job/JobFreelancer');



//Get Requests
router.get('/user-skills/:userid', GetAllUserSkills);
router.get('/user-qualifications/:userid', GetUserQualifications);
router.get('/user-portfolios/:userid', GetUserPortfolios);
router.get('/user-profile/:userid', GetUserProfile);
router.get('/all-jobs', GetAllJobsFreelancer);
router.get('/all-freelancer-jobs/:userid', GetAllFreelancerJobs);
router.get('/filter-jobs', GetJobsFilterFreel);
router.get('/user-applied-jobs/category/:userid', GetAppliedJobs);






//Post Requests
//Profile
router.post('/update-password', UpdatePassword);
router.post('/update-user-profile', UpdateProfileUser);
router.post('/update-business-profile', UpdateProfileBusiness);
router.post('/add-user-education', AddEducation);
router.post('/update-user-education', UpdateEducation);
router.post('/add-user-portfolio', AddPortfolioUser);
router.post('/update-user-portfolio', UpdatePortfolioUser);
router.post('/add-user-portfolio', AddPortfolioBusiness);
router.post('/update-user-portfolio', UpdatePortfolioBusiness);
router.post('/add-user-skill', AddSkillUser);
router.post('/update-user-skill', UpdateSkillUser);
router.post('/add-business-skill', AddSkillBusiness);
router.post('/update-business-skill', UpdateSkillBusiness);
router.post('/update-user-qualification', UpdateQualification);
router.post('/add-user-qualification', AddQualification);



//POST requests
router.post('/post-job', DoPostJob);
router.post('/update-job/:id', UpdateJob);
router.post('/delete-job/:id', DeleteJob);


//freelancer
router.post('/apply-job/:id/:userid', ApplyJob);



module.exports = router;
