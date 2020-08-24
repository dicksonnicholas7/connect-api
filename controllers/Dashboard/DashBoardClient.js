const { Op } = require("sequelize");
const Job = require('../../models').Job;
const JobCategory = require('../../models').JobCategory;
const JobApplication = require('../../models').JobApplication;
const UserAccount = require('../../models').UserAccount;
const User = require('../../models').User;
const JobPayment = require('../../models').JobPayment;
const Chat = require('../../models').Chat;
const Contract = require('../../models').Contract;
const JobReport = require('../../models').JobReport;
const db = require("../../models");
const { QueryTypes } = require('sequelize');
const { jobs } = require("googleapis/build/src/apis/jobs");
const SelectedJobs = require('../../models').SelectedJobs;




module.exports.GetDashboardClient = async (req, res, next) => {

    let userRole = res.locals.userAccount.role_id;

    let ft = res.locals.userAccount.first_time;

    if(userRole === 1){

        
      let jobs = await Job.findAll({
        where: {client_id: res.locals.user.user_account_id}, 
        include: [
            {  
                model:JobApplication,
                as: 'JobApplication'
            }
          
          ]

      });


      let freelancers = await UserAccount.findAll({ where: {role_id:2}, include:User});

   
    let sql =   "SELECT DISTINCT jobapplications.application_status, users.first_name, users.last_name, jobs.job_title, "+
    "jobs.job_status, jobs.updatedAt, jobs.id " +
      "FROM `jobapplications` " +
          "LEFT JOIN jobs ON jobs.id = jobapplications.job_id " +
          "LEFT JOIN useraccounts ON jobapplications.freelancer_id = useraccounts.user_account_id " +
          "LEFT JOIN users ON users.user_account_id = jobapplications.freelancer_id";

          const [jobs_results, metadata] = await db.sequelize.query(sql);


  let allJobsCount = 0;
  let JobsAwardedCount = 0;
  let JobsInProgressCount = 0;
  let JobsCompletedCount =0;

  jobs.map(j => {
      allJobsCount++
  }); 

  jobs_results.map(j => {
      if(j.application_status === 'awarded' || j.application_status === 'accepted'){
          JobsAwardedCount++
      }
      if(j.job_status === 'in progress'){
          JobsInProgressCount++
      }
      if(j.job_status === 'completed'){
          JobsCompletedCount++
      }    
  });


  res.render(
      'dashboard/dashboard-client',
      {
          jobs,
          allJobsCount,
          JobsAwardedCount,
          freelancers,
          JobsInProgressCount,
          JobsCompletedCount,
          jobs_results
      }
  )


    }else{

        console.log('you are not a client ')

    }
};



module.exports.GetClientDashboardStats = async (req, res, next ) => {

 
      let jobs = await Job.findAll({
        where: {client_id: res.locals.user.user_account_id}, 
        include: [
            {  
                model:JobApplication,
                as: 'JobApplication'
            }
          
          ]

      });


      
    let sql =   "SELECT DISTINCT jobapplications.application_status, users.first_name, users.last_name, jobs.job_title, "+
    "jobs.job_status, jobs.updatedAt, jobs.id " +
      "FROM `jobapplications` " +
          "LEFT JOIN jobs ON jobs.id = jobapplications.job_id " +
          "LEFT JOIN useraccounts ON jobapplications.freelancer_id = useraccounts.user_account_id " +
          "LEFT JOIN users ON users.user_account_id = jobapplications.freelancer_id ";

          const [jobs_results, metadata] = await db.sequelize.query(sql);


  let allJobsCount = 0;
  let JobsAwardedCount = 0;
  let JobsInProgressCount = 0;
  let JobsCompletedCount =0;

  jobs.map(j => {
      allJobsCount++
  }); 

  jobs_results.map(j => {
      if(j.application_status === 'awarded' || j.application_status === 'accepted'){
          JobsAwardedCount++
      }
      if(j.job_status === 'in progress'){
          JobsInProgressCount++
      }
      if(j.job_status === 'completed'){
          JobsCompletedCount++
      }    
  });

  let clientStats = {
      allJobs:allJobsCount,
      jobsAwarded:JobsAwardedCount,
      jobsInprogress:JobsInProgressCount,
      jobsCompeleted:JobsCompletedCount
  }


res.send(clientStats)

};

