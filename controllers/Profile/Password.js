const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const crypto = require('crypto');
const {secret} = require('../../config/keys');

module.exports.UpdatePassword = async (req, res, next) => {
    let api_response = {
        error: '',
        response: '',
    };
    let changePass_obj = {};
    try{
        changePass_obj.userid = req.body.userid || '';
        changePass_obj.old_password = req.body.old_password || '';
        changePass_obj.new_password = req.body.new_password || '';
    }catch(error){
        console.log(error);
        res.json({"error":"empty_fields"});
    }

    let checkUser = await User.findOne({ where: {id: req.body.userid} });
    if(checkUser==null){
        api_response.error = "invalid_userid";
    }else {

        let checkPass = await UserAccount.findOne({ where:{password:hashPassword(changePass_obj.old_password)} });
        if(checkPass==null){
            api_response.error = "incorrect_old_password";
        }else{

            if(changePass_obj.new_password !== ''){
                let userDetails = {
                    password: hashPassword(changePass_obj.new_password),
                };
                let response = await UserAccount.update(userDetails, {where: {UserId: changePass_obj.userid}});
                console.log(response);
                if (response != null) {
                    api_response.success = "success";
                } else {
                    api_response.error = "error";
                }
            }else{
                api_response.error = "invalid_password";
            }

        }
    }
    res.json(api_response);
};

hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};