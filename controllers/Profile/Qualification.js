const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const Qualification = require('../../models').Qualification;
const crypto = require('crypto');
let secret = "group3";
const path = require('path');
const multer = require('multer');



module.exports.GetUserQualifications = async (req, res, next) => {
    let api_response = {
        error:'',
        success:'',
        response:''
    }

    if(!req.params.userid){
        api_response.error = 'empty_feild'
    }else{
        let user_qualification = Qualification.findAll({where:{userId:req.params.userid}});
        if(user_qualification!==null){
            api_response.success = 'success';
            api_response.response = user_qualification;
        }else{
            api_response.error = 'error';
        }
    }

    res.json(api_response);
}


module.exports.AddQualification = async (req, res, next) => {
    let api_response = {
        error: '',
        response: '',
    };
    let user_qualification = {};
    try{
        user_qualification = {
            UserId: req.body.userid,
            prof_cert: req.body.prof_cert,
            con_org: req.body.con_org,
            summary: req.body.summary
        };
    }catch(error){
        console.log(error);
        api_response.error = "empty_fields";
    }
    let qualification_added = Qualification.create(user_qualification);
    if(qualification_added!==null){
        api_response.success = "success";
    }else{
        api_response.error = "error";
    }

    res.json(api_response);

}

module.exports.UpdateQualification = async (req, res, next) => {
    let api_response = {
        error: '',
        response: '',
    };
    let user_qualification = {};
    try{
        user_qualification = {
            UserId: req.body.userid,
            prof_cert: req.body.prof_cert,
            con_org: req.body.con_org,
            summary: req.body.summary
        };
    }catch(error){
        console.log(error);
        api_response.error = "empty_fields";
    }
    let qualification_updated = Qualification.update(user_qualification, {where:{UserId:user_qualification.UserId}});
    if(qualification_updated!==null){
        api_response.success = "success";
    }else{
        api_response.error = "error";
    }

    res.json(api_response);
}