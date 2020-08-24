const { Op } = require("sequelize");
const Job = require('../../models').Job;
const Skills = require('../../models').Skills;
const JobSkills = require('../../models').JobSkills;
const JobCategory = require('../../models').JobCategory;
const UserAccount = require('../../models').UserAccount;
const User = require('../../models').User;
const db = require("../../models");



module.exports.GetAllFreelancers = async (req, res, next ) => {


    let all_freelancers = await UserAccount.findAll({where:{role_id:2}, include:[User]});

    console.log(all_freelancers)


   let sql =  "SELECT useraccounts.user_account_id, users.first_name, users.last_name " +

"FROM " +

"`useraccounts` " + 

"LEFT JOIN users ON users.user_account_id = useraccounts.user_account_id " +

"WHERE useraccounts.role_id = 2" ;

const [freelancers, metadata] = await db.sequelize.query(sql);


console.log(freelancers)


    res.send(freelancers);
}



module.exports.GetPostJob = async (req, res, next) => {

    let response = {
        error:'',
        success:''
    }


//check if user logged in is a client and authorised to view the requested page
    let check_user_role = UserAccount.findOne({where:{user_account_id:res.locals.UserAccount.user_account_id}});

    if(check_user_role === 1) {

        //if the user is a client, get all the skills in DB and provide as data on the page for user to select
        let all_skills = await Skills.findAll();

        //get all freelancers on platform for client to select when posting job to selected users
        let freelancers = await UserAccount.findAll({where:{role_id:2}, include: [User]});
    
        //provide category names to client for selection when posting jobs
        let category = await JobCategory.findAll();
    
        //render the requested page
        // res.render(
        //     'job/post-job',
        //     {
        //         //provide relevant data required
        //         category,
        //         all_skills,
        //         freelancers,
        //         successMessage:'',
        //         errorMessage:''
        //     }
        // );
        res.status(200);
        response.error = ''
        response.success = 'success'
    }else{

        //if the user logged in is not a client, console the output
        console.log("Sorry, You are not authorised to view this page.");

        res.status(400);
        response.error = 'Sorry, You are not authorised to view this page.'
        response.success = ''
    }


    res.json(response);
};





module.exports.DoPostJob = async (req, res, next) => {

    //assign request body to local variable
    let skills = req.body.skills;
    
    console.log(skills)
    
    //get all skills in DB 
    let all_skills = await Skills.findAll();

    //get the hostname, required to send email to freelancers client selects to post job to
    let hostname = req.headers.host;


    //jobtype(1 for job to all freelancers, 2 for jobs to selected freelancer)
    let jobType = 1;

    //if client selects no freelancer when posting job, send job posted to all freelancers on the platform
    if(!req.body.freelancers){

        // declare an object to hold the incoming request body
        let jobInfo = {
            ClientId: res.locals.user.id,
            job_title: req.body.title,
            job_details: req.body.details,
            job_timeLength: req.body.timeLength_number + req.body.timeLength_period,
            job_price: req.body.price,
            job_CatId: req.body.category,
            job_jobType:jobType
        };

        console.log(jobType)

        //create job record in DB
        let job_created = await Job.create(jobInfo);

        //check if job record was successfully created
        if(job_created!==null){

            console.log('job created')

            //create records for job skills selected by client when posting job
            for(i=0;i<skills.length;i++){
    
                //creat objects for each skills in loop
                let jobSkills = {
                    JobId: job_created.id,
                    job_skill_name: skills[i]
                };
            
                //create record for each skill in loop
                JobSkills.create(jobSkills);

                console.log('skills added')
            }
     
            console.log("Job Posted successfully");

            //redirect client to dashboard after successfully posting job
            res.redirect("/user/dashboard-client");

        }else{

            //code runs when error occurs during job record creation
            let category = await JobCategory.findAll();

            //get all freelancers on platform and assign to local variable
            let freelancers = await UserAccount.findAll({ where:{role_id:2},include: [User] });


            console.log("Error posting job");

            //render the post job page with the error and data needed by page
            res.render(
                'job/post-job',
                {
                    category,
                    freelancers,
                    errorMessage:'Error Posting Job',
                    successMessage:''
                }
            );
        }
    }else{

        //if client selects only one freelancer to post job to, display an error
        if(req.body.freelancers.length === 36){
            jobType = 1;

            let category = await JobCategory.findAll();
            let freelancers = await UserAccount.findAll( {where:{role_id:2}, include: [User] });
            res.render(
                'job/post-job',
                {
                    category,
                    freelancers,
                    errorMessage:'Error : Freelancers to view the posted job must be 2 or more',
                    successMessage:''
                }
            );
        }else{

            //jobtype for selected freelancers
            jobType = 2;

            //local variable to hold object from DB
            let job_created = {};

            for(i=0;i<req.body.freelancers.length;i++){

                let freelancerInfo = await User.findOne({where:{user_account_id:req.body.freelancers[i]}});

                let jobInfo = {
                    client_id: res.locals.userAccount.user_account_id,
                    job_category_id: req.body.job_category_id,
                    job_title: req.body.title,
                    job_details: req.body.details,
                    job_timeLength: req.body.timeLength_number +' '+ req.body.timeLength_period,
                    job_price: req.body.price,
                    job_skills: req.body.skills,
                    CatId: req.body.category,
                    job_jobType:jobType
                };
        
                let job_created = await Job.create(jobInfo);

                if(job_created!==null){
                    let selectedJobInfo = {
                        ClientId: res.locals.user.id,
                        FreelancerId: req.body.freelancers[i],
                        JobId: job_created.id
                    }

                    selectedJobCreated = await SelectedJobs.create(selectedJobInfo);
                }

                console.log(job_created)
                console.log(freelancerInfo)   

                console.log(freelancerInfo.email);

;
                let notifyMailParts = {
                    title: res.locals.user.firstname+"Selected to View Posted Job",
                    message: '<div style="background-color:white;color:black;">'+
                             '<p style="font-weight: bold;">Group 3 freelancer.</p>'+ 
                             '<p>Hi, '+req.session.user.first_name+ ' selected you to view a job he/she posted.</p>'+
                            '<p><a href="http://'+hostname+'/login/'+'">Click here to login and view the job</a></p></div>',
                    ReceiverEmail: freelancerInfo.email
                };

                NotifyMail(notifyMailParts.title, notifyMailParts.message, notifyMailParts.ReceiverEmail);
              
                console.log('email sent to ' + freelancerInfo.email );

        }

        if(job_created!==null){
            console.log("Job Posted successfully");
            let category = await JobCategory.findAll();
            let freelancers = await UserAccount.findAll( {
                where: {
                    [Op.and]: [
                        {RoleId:2},
                        {UserTypeId:2}
                    ]
                },
                include: [User]
            });
            res.render(
                'job/post-job',
                {
                    category,
                    freelancers,
                    successMessage:'Job Posted successfully and Email sent to selected freelancers',
                    errorMessage:''
                }
            )
        }else{
            let category = await JobCategory.findAll();
            let freelancers = await UserAccount.findAll( {
                where: {
                    [Op.and]: [
                        {RoleId:2},
                        {UserTypeId:2}
                    ]
                },
                include: [User]
            });
            res.render(
                'job/post-job',
                {
                    category,
                    freelancers,
                    successMessage:'',
                    errorMessage:'Error Posting Job'
                }
            )
        }

            
        }

    }

};



module.exports.AddJobSkills = async (req, res, next ) => {

    let userExperience = {
        UserId:req.body.id,
        name:req.body.name,
        years:req.body.years
    }
    
    let skills = req.body.skills;
    
    console.log(skills)
    
    
    for(i=0;i<skills.length;i++){
    
        let userSkills = {
            UserId: req.body.id,
            SkillsCatId:2,
            name: skills[i]
        };
    
        UserSkills.create(userSkills);
    }
    
        user_skills = await UserSkills.findAll({where:{UserId:req.body.id}});
    
        if(user_skills!==null){
            console.log('skills added successfully');
    
            Experience.create(userExperience);
    
         user_experience = await Experience.findAll({where:{UserId:req.body.id}});
    
            if(user_experience !== null){
                UserAccount.update({firstTime:false}, {where:{id:req.body.id}});
                res.redirect('/user/dashboard-freelancer');
            }else{
                console.log('error adding user experience');
            }
    
        }else{
            console.log('error adding user skills');
        }
    
    }



    function AddJobSkills(skills) {
                    //create records for job skills selected by client when posting job
                    for(i=0;i<skills.length;i++){
    
                        //creat objects for each skills in loop
                        let jobSkills = {
                            JobId: job_created.id,
                            job_skill_name: skills[i]
                        };
                    
                        //create record for each skill in loop
                        JobSkills.create(jobSkills);
        
                        console.log('skills added')
                    }
    }
