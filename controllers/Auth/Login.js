const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const crypto = require('crypto');
const {secret} = require('../../config/keys');


//perform login
module.exports.DoLogin = async (req, res, next) => {
    let api_response = {
        error: '',
        success: '',
        token: '',
        userid:'',
    }
    let userAccount= {};
    try {
        userAccount = {
            email: req.body.email,
            password: hashPassword(req.body.password)
        };
    }catch(error){
        console.log(error);
        res.json({"error":"empty_fields"});
    }

    let ret_userAccount = await User.findOne({
        where: {email: userAccount.email},
        include: [UserAccount]
    });
    if (ret_userAccount !== null) {
        if (userAccount.password === ret_userAccount.UserAccount.password) {      
            api_response.token = ret_userAccount.UserAccount.token
            api_response.userid = ret_userAccount.id
            api_response.success = "success";
        } else {
            console.log("Wrong Password");
            api_response.error = "wrong_password"
        }
    } else {
        console.log("Wrong Username Or User does not exist");
        api_response.error = "not_exist"
    }

    res.json(api_response);
};


//method for hashing password
hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};