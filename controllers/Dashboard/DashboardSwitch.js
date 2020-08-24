const User = require('../../models').User;
const UserSkills = require('../../models').UserSkills;
const { 
    GetCompleteFreelancerProfile, 
    GetCompleteFreelancerSkills , 
    GetCompleteFreelancerEducation
} = require('../Profile/GetPages');


module.exports.GetDashboardSwitch = async (req, res, next) =>{
        console.log('second time')
        if(res.locals.userAccount.role_id===1){
            res.redirect('/user/dashboard-client');
        }else if(res.locals.userAccount.role_id===2){
            if(req.session.userAccount.User.first_name === '' || req.session.userAccount.User.first_name === null){
                res.redirect('/user/complete-freelancer-profile');
            }else{
                res.redirect('/user/dashboard-freelancer');
            }
            
        }else if(res.locals.userAccount.role_id===3){
            res.redirect('/user/dashboard-admin');
        }
};