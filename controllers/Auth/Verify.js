const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const {SendMailConfirmVerify} = require('./ConfirmVerification');
const {SendMailVerify} = require('./VerificationEmail');

//perform verification process
module.exports.DoVerification = async (req, res, next) => {
    let api_response = {
        error: '',
        success: '',
    }
    let ver_obj = {}
    try{
        ver_obj.email = req.body.email;
        ver_obj.token = req.body.token;
    }catch(error){
        console.log(error);
        res.json({"error":"empty_fields"});
    }
    let ret_userAccount = await User.findOne({where: {email: ver_obj.email}, include: UserAccount});
    if(ret_userAccount!==null){
        if(ret_userAccount.UserAccount.token===ver_obj.token){
            let verify_user = UserAccount.update({verified:true}, {where:{id: ret_userAccount.UserAccount.id}});
            if(verify_user!==null){
                api_response.success = "success";
            }else{
                api_response.error = "error";
            }
        }else{
            api_response.error = "invalid_token";
        }
    }else{
        api_response.error = "invalid_verification_link";
    }

    res.json(api_response);
};



