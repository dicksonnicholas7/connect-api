const User = require('../../models').User;
const UserSkills = require('../../models').UserSkills;
const Portfolio = require('../../models').Portfolio;
const Skills = require('../../models').Skills;
const Experience = require('../../models').Experience;
const UserAccount = require('../../models').UserAccount;
const multer = require('multer'); 
const path = require('path');
const crypto = require('crypto');




module.exports.AddSkills = async (req, res, next) => {

    let response = {
        error:'',
        success:''
    }

let userSkills

let skills = req.body.skills;

console.log(skills)


if(skills.length > 1){
  
for(i=0;i<skills.length;i++){

    userSkills = {
        user_account_id:req.body.id,
        user_skills_name:skills[i]
    };

    UserSkills.create(userSkills);
}

    user_skills = await UserSkills.findAll({where:{user_account_id:req.body.id}}).then(server_response => {
        res.status(200);
        response.success = server_response;
        response.error = '';
    }).catch(err => {
        res.status(400);
        response.success = '';
        response.error = err;
    });
}else{
    if(skills.length === 1){

        userSkills = {
            user_account_id:req.body.id,
            skills_id:skills[0]
        };
    
        UserSkills.create(userSkills).then(server_response => {
            res.status(200);
            response.success = server_response;
            response.error = '';     
        }).catch(err => {
            res.status(400);
            response.success = '';
            response.error = err;
        });
    }else{
        response.error = 'please select a skill'
    }
}

res.json(response);

}

module.exports.UpdateSkill = async(req, res, next) => {
    let userId = res.locals.userAccount.user_account_id;
    let skillId = req.body.skillId;

    let skill_update_details = {
        user_skills_name : req.body.skill_name
    }

    UserSkills.update(skill_update_details,{where:{id:skillId}}).then(skill_update_res => {
        console.log('skill updated successfully');
    }).catch(err=>{
        console.log(err)
    })
}


module.exports.DeleteSkill = async (req, res, next) => {
    let skillId = req.params.id;

    UserSkills.destroy({where:{id:skillId}}).then(skill_res=> {
        console.log("skill deleted")
    }).catch(err=>{
        console.log(err)
    })
}




//hash password
hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};