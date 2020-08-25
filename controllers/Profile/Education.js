const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const Education = require('../../models').Education;


module.exports.AddEducation = async (req, res, next) =>{
    let api_response = {
        error: '',
        response: '',
    };
    let userEducation = {};
    try{
        userEducation = {
            UserId: req.body.userid,
            country: req.body.country,
            uni: req.body.school,
            cert: req.body.cert,
            start_year: req.body.start_year,
            endyear: req.body.end_year
        };
    }catch(error){
        console.log(error);
        api_response.error = "empty_fields";
    }
    let education_added = Education.create(userEducation);
    if(education_added!==null){
        api_response.success = "success";
    }else{
        api_response.error = "error";
    }
    res.json(api_response);
};

//update user education
module.exports.UpdateEducation = async (req, res, next) => {
    let api_response = {
        error: '',
        response: '',
    };
    let userEducation = {};
    try{
        userEducation = {
            UserId: req.body.userid,
            country: req.body.country,
            uni: req.body.school,
            cert: req.body.cert,
            start_year: req.body.start_year,
            endyear: req.body.end_year
        };
    }catch(error){
        console.log(error);
        api_response.error = "empty_fields";
    }
    let education_added = Education.update(userEducation, { where:{UserId:userEducation.UserId} });
    if(education_added!==null){
        api_response.success = "success";
    }else{
        api_response.error = "error";
    }
    res.json(api_response);

};