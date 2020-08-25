const { Op } = require('sequelize');
const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const crypto = require('crypto');
const {secret} = require('../../config/keys');
const {SendMailResetPassword} = require('./ForgotPasswordMaill');

// perform password reset by generating a token plus a link amd sending to user email if email exists
module.exports.forgotPasswordEmail = async (req,res,next)=>{
    let api_response = {
        error: '',
        success: ''
    }
    let userAccount = {};
    try{   
        userAccount = {
            email: req.body.email
        };
    }catch(error){
        console.log(error);
        res.json({"error": "empty_field"});
    }

    let ret_user = await User.findOne({ where:{email:userAccount.email} });
    if(ret_user!==null) {
        let token = hashPassword(userAccount.email);
        console.log(token);
        console.log("Token:  " + token);
        let hostname = req.headers.host;
        //send reset link to email
        SendMailResetPassword(userAccount.email, token, hostname);
        api_response.success = "email_sent";
    }else{
        api_response.error = "email_not_found"
    }
    
    res.json(api_response);
};

module.exports.VerifyLink = async (req, res, next)=>{
    let token = req.params.token;
    let email = req.params.email;
    (token === hashPassword(email)) ? res.json({"success":"success"}) : res.json({"error":"invalid"});
};

//perform password
module.exports.DoResetPassword = async (req,res,next)=>{
    let api_response = {
        error: '',
        success: ''
    }
    let reset_obj = {};
    try {
        reset_obj.email = req.body.email;
        reset_obj.newPassword = {
            password: hashPassword(req.body.password)
        };
    } catch (error) {
        console.log({"error": "empty_field"});
        res.json({"error": "empty_field"});
    }
    
    let user_info = await User.findOne({ where:{email:reset_obj.email} });
    if(user_info!==null){
        let upd_userAccount = await UserAccount.update(reset_obj.newPassword,{ where: {UserId: user_info.id} });
        if(upd_userAccount!==null){
            api_response.success = "success";
        }else{
            api_response.error = "error_updating"
        }
    }else{
        api_response.error = "email_not_found";
    }
      
    res.json(api_response);
};

//hash password
hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};