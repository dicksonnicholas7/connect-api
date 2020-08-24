/** importing dependencies and models
 * 
 * 
 * 
 */
const UserSkills = require('../../models').UserSkills;
const Certification = require('../../models').Certification;
const User = require('../../models').User;
const Experience = require('../../models').Experience;
const Portfolio = require('../../models').Portfolio;
const Skills = require('../../models').Skills;
const UserAccount = require('../../models').UserAccount;
const axios = require('axios');
const Qualification = require('../../models').Qualification;
const Education = require('../../models').Education;




module.exports.GetViewFreelancer =  async (req, res, next) => {

    let free_user = await UserAccount.findOne({where:{user_account_id:res.locals.userAccount.user_account_id}, include:[User, Education]});
    let cert = await Certification.findAll({where:{user_account_id:res.locals.userAccount.user_account_id}});
    let exp = await Experience.findAll({where:{user_account_id:res.locals.userAccount.user_account_id}});

    console.log(exp)


    
      //Get list of countries from an external api
      let country = [];
      axios.get('https://restcountries.eu/rest/v2/all')
          .then(response => {
              country = response.data;
              req.session.profileChangeMessage = "";
              res.render(
               'profile/viewing-profile/view-freelancer',
               {
                   country,
                   cert,
                   exp,
                   free_user,
                   page: ''
               }
           )
          })
          .catch(error => {
              //api fails, add some countries
              console.log(error);
              country = [
                  {name: 'Ghana'},
                  {name: 'Germany'},
              ];
              res.render(
               'profile/viewing-profile/view-freelancer',
               {
                   country,
                   cert,
                   exp,
                   free_user,
                   page: ''
               }
           )
          });

}



module.exports.GetFreelancerProfileView = async (req, res, next) => {
    res.render('profile/freelancer-profile')
}


module.exports.GetClientView = async (req, res, next) => {

    let res_user = await User.findOne({where:{user_account_id:res.locals.userAccount.user_account_id}});

      //Get list of countries from an external api
      let country = [];
      axios.get('https://restcountries.eu/rest/v2/all')
          .then(response => {
              country = response.data;
              req.session.profileChangeMessage = "";
              res.render(
               'profile/viewing-profile/client-view',
               {
                   country,
                   res_user,
                   page: 'client'
               }
           )
          })
          .catch(error => {
              //api fails, add some countries
              console.log(error);
              country = [
                  {name: 'Ghana'},
                  {name: 'Germany'},
              ];
              res.render(
               'profile/viewing-profile/client-view',
               {
                   country,
                   res_user,
                   page: 'client'
               }
           )
          });
}

module.exports.GetClientProfileView = async (req, res, next ) => {


    let res_user = await UserAccount.findOne({where:{user_account_id:res.locals.userAccount.user_account_id}, include:User});
    
    res.render(
        'profile/viewing-profile/client-view',
        {
            res_user
        }
        
        )
}


//get all education
module.exports.GetAllEducations = async (req, res, next) => {

    res.render(
        'profile/completing-profile/complete-freelancer-education'
    )
}


module.exports.GetEducation = async (req, res, next) => {
    let education_id = req.params.id;
    let user_education = await Education.findOne({where:{id:education_id} });
    let country = [
        {name: 'Ghana'},
        {name: 'Germany'},
    ];
    res.render(
        'profile/education',
        {
            user_education,
            country
        }
    )
 
    
};
 
//render education page
module.exports.GetAddEducation = async (req, res, next) => {
    let country = [
        {name: 'Ghana'},
        {name: 'Germany'},
    ];
    res.render(
        'profile/add-education',
        {
            country
        }
    )   
};

module.exports.GetPaymentDetails = async (req, res, next) => {
    let user_payment = await UserPaymentInfo.findOne({where:{user_account_id:res.locals.userAccount.id} });
    req.session.user.UserPaymentInfo  = user_payment;
    res.render(
        'profile/payment-details',
        {
            page:'payment',
            success:'',
            error:'',
            accountNumber:'',
        }
    )
};

module.exports.GetAllPortfolios = async (req, res, next) => {
    let user_portfolios = await Portfolio.findAll({where:{UserId:res.locals.user.id} });
    req.session.user.Portfolio  = user_portfolios;
    res.render(
        'profile/portfolios'
    )
}

//render portfolio page
module.exports.GetCompletePortfolio = async (req, res, next) => {

        res.render(
            'portfolio/complete-portfolio',
            {
                page: 'complete-portfolio'
            }
        )
 
};

//render portfolio page with response
module.exports.GetPortfolioSuccess = async (req, res, next) => {
    let portfolio_id = req.params.id;
    let user_portfolio = await Portfolio.findOne({where:{id:portfolio_id} });
    res.render(
        'profile/portfolio',
        {
            user_portfolio
        }
    )
};

module.exports.GetAddPortfolio = async (req, res, next) =>{
    res.render(
        'profile/add-portfolio',
    )
};



module.exports.GetCompleteSkills = async (req, res, next) => {

    let skills = Skills.findAll();
    
    console.log(skills)
    
        res.render(
            'skills/complete-skills',
            {
                skills,
                page: 'complete-skills'
            }
        )
    };


//render qualification page
module.exports.GetQualification = async (req, res, next) => {
    let user_qualification = await Qualification.findOne({where:{UserId:res.locals.user.id} });
    req.session.user.Qualification  = user_qualification;
    console.log(user_qualification);
    req.session.qualificationChangeMessage = "";
    res.render(
        'profile/qualification',
        {
            qsuccess:'',
            qerror: '',
        }
    )
};

//render qualification page with response
module.exports.GetQualificationSuccess = async (req, res, next) => {
    let user_qualification = await Qualification.findOne({where:{UserId:res.locals.user.id} });
    req.session.user.Qualification  = user_qualification;
    console.log(user_qualification);
    res.render(
        'profile/qualification',
        {
            qsuccess:'Information updated',
            qerror: '',
        }
    )
};



//get the client profile page
module.exports.GetClientProfile = async (req, res, next) => {
    //render the page from the views directory

       //Get list of countries from an external api
       let country = [];
       axios.get('https://restcountries.eu/rest/v2/all')
           .then(response => {
               country = response.data;
               req.session.profileChangeMessage = "";
               res.render(
                'profile/client',
                {
                    country,
                    page: 'client'
                }
            )
           })
           .catch(error => {
               //api fails, add some countries
               console.log(error);
               country = [
                   {name: 'Ghana'},
                   {name: 'Germany'},
               ];
               res.render(
                'profile/client',
                {
                    country,
                    page: 'client'
                }
            )
           });
};




//display the freelancer profile page
module.exports.GetFreelancerProfile = async (req, res, next) => {

let edu_present = false;

let check_edu = await Education.findOne({where:{user_account_id:res.locals.userAccount.user_account_id}});

if(check_edu !== null ){
    edu_present = true;
}

    //assign user session id to local variable
    let userId = res.locals.userAccount.user_account_id;

    //query DB for user details based on session id
    let userDetails = await UserAccount.findOne({
        where:{user_account_id:userId}, 
        include: [User, UserSkills, Portfolio, Experience, Education]
    });


                   //Get list of countries from an external api
                   let country = [];
                   axios.get('https://restcountries.eu/rest/v2/all')
                       .then(response => {
                           country = response.data;
                           req.session.profileChangeMessage = "";
                           res.render(
                            'profile/profile-freelancer',
                            {
                                country,
                                userDetails,
                                edu_present,
                                page: 'profile-freelancer'
                            }
                        )
                       })
                       .catch(error => {
                           //api fails, add some countries
                           console.log(error);
                           country = [
                               {name: 'Ghana'},
                               {name: 'Germany'},
                           ];
                           res.render(
                            'profile/profile-freelancer',
                            {
                                country,
                                userDetails,
                                edu_present,
                                page: 'profile-freelancer'
                            }
                        )
                       });
};




//get profile page for first time freelancer to provide neccessary details
module.exports.GetCompleteFreelancerProfile = async (req, res, next) => {

    //assign user session id to local variable  
let userRole = res.locals.userAccount.role_id;

let edu = await Education.findAll({where:{user_account_id:res.locals.userAccount.user_account_id}});
let exp = await Experience.findAll({where:{user_account_id:res.locals.userAccount.user_account_id}});
let cert = await Certification.findAll({where:{user_account_id:res.locals.userAccount.user_account_id}});

//check if user is a freelancer and get the page
if(userRole === 2){
               //Get list of countries from an external api
               let country = [];
               axios.get('https://restcountries.eu/rest/v2/all')
                   .then(response => {
                       country = response.data;
                       req.session.profileChangeMessage = "";
                       res.render(
                        'profile/completing-profile/complete-freelancer-profile',
                        {
                            country,
                            edu,
                            exp,
                            cert,
                            page: 'complete-freelancer-profile'
                        }
                    )
                   })
                   .catch(error => {
                       //api fails, add some countries
                       console.log(error);
                       country = [
                           {name: 'Ghana'},
                           {name: 'Germany'},
                       ];
                       res.render(
                        'profile/completing-profile/complete-freelancer-profile',
                        {
                            country,
                            edu,
                            exp,
                            cert,
                            page: 'complete-freelancer-profile'
                        }
                    )
                   });

}else{
    //console error
    console.log('sorry, you are not a freelancer')
}
};








//get the education form 
module.exports.GetCompleteFreelancerEducation = async (req, res, next) => {

    //assign user session id to local variable
    let userRole = res.locals.userAccount.role_id;

    //check if user is a freelancer and authorised to access the page
if(userRole === 2){

    //Get list of countries from an external api
    let country = [];
    axios.get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            country = response.data;
            req.session.profileChangeMessage = "";
            res.render(
             'profile/completing-profile/complete-freelancer-education',
             {
                 country,
                 page: 'complete-freelancer-education'
             }
         )
        })
        .catch(error => {
            //api fails, add some countries
            console.log(error);
            country = [
                {name: 'Ghana'},
                {name: 'Germany'},
            ];
            res.render(
             'profile/completing-profile/complete-freelancer-education',
             {
                 country,
                 page: 'complete-freelancer-education'
             }
         )
        });

}else{
    //console log error
console.log('sorry, you are not a freelancer')
}

}




//get the portfolio page for first time user
module.exports.GetCompleteFreelancerPortfolio = async (req, res, next) => {

    //assign user id to local variable
    let userRole = res.locals.userAccount.role_id;

    //check if user is authorised to view page
    if(userRole === 2){
        //render the portfolio page from the views directory
        res.render('profile/complete-freelancer-portfolio' )
    }else{
        //console log error
        console.log('complete your profile first')
    }
};



//get the skills section of the forms for the freelancer
module.exports.GetCompleteFreelancerSkills = async (req, res, next) => {

    //assign user session id to local variable
    let userRole = res.locals.userAccount.role_id;

    //check if user is a freelancer and is authorised to view page
    if(userRole === 2){

        //query db for skills data for the page
        let skills = await Skills.findAll();

         //Get list of countries from an external api
         let country = [];
         axios.get('https://restcountries.eu/rest/v2/all')
             .then(response => {
                 country = response.data;
                 req.session.profileChangeMessage = "";
                 res.render(
                  'profile/complete-freelancer-skills',
                  {
                      country,
                      skills,
                      page: 'complete-freelancer-skills'
                  }
              )
             })
             .catch(error => {
                 //api fails, add some countries
                 console.log(error);
                 country = [
                     {name: 'Ghana'},
                     {name: 'Germany'},
                 ];
                 //render the skills page with the data from db
                 res.render(
                  'profile/complete-freelancer-skills',
                  {
                      country,
                      skills,
                  }
              )
             });
    }else{
        console.log('complete your portfolio first')
    }
};




//render profile page if update successful and show response
module.exports.GetProfileSuccess = async (req, res, next) => {
    //Get list of countries from an external api
    let country = [];
    axios.get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            country = response.data;
            res.render(
                'profile/profile',
                {
                    country
                }
            )
        })
        .catch(error => {
            console.log(error);
            country = [
                {name: 'Ghana'},
                {name: 'Germany'},
            ];
            res.render(
                'profile/profile',
                {
                    country
                }
            )
        });
};


//hash password
hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};