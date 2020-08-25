const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const BusinessUser = require('../../models').BusinessUser;
const crypto = require('crypto');
const {secret} = require('../../config/keys');
const jwt = require('jsonwebtoken');
const {SendMailVerify} = require('./VerificationEmail');


//perform signup operation.
module.exports.DoSignUp = async (req, res, next) => {
    let api_response = {
        error: '',
        response: '',
    };
    let userInfo = {};
    //generate a token for email verification
    const token = jwt.sign(
        { userId: req.body.email },
        'AMALITECHFREELANCE',
        { expiresIn: '24h' });

    try{
        userInfo = {
            email: req.body.email || '',
            mobile: req.body.mobile || '',
            UserAccount: [
                {
                    username: req.body.username || '',
                    password: hashPassword(req.body.password),
                    RoleId: req.body.role,
                    UserTypeId: req.body.usertype,
                    verified: false,
                    token: token,
                }
            ]
        };
    }catch (error) {
        console.log(error);
        res.json({"error":"empty"});
    }
    //check if email is already used
    // console.log(userInfo.UserAccount[0].UserTypeId);
    if(userInfo.UserAccount[0].UserTypeId===2){
        console.log("bus")
        let user = await BusinessUser.findOne({ where:{email:userInfo.email} });
        if(user!==null && user.email===userInfo.email){
            console.log("Business already exists. Log in");
            api_response.error = "exists";
        }else{
            let user_Account = await BusinessUser.create(userInfo, { include: [UserAccount] } );
            if(user_Account.id!==null){
                    //send verification email
                    let hostname = req.headers.host;
                    SendMailVerify(userInfo.email, token, hostname);
                    api_response.response = "success";
                }else{
                    api_response.error = "error";
                }
        }
    }else{
        console.log("user")
        let user = await User.findOne({ where:{email:userInfo.email} });
        console.log("after user find")
        if(user!==null && user.email===userInfo.email){
            console.log("User already exists. Log in");
            api_response.error = "exists";
        }else{
            let user_Account = await User.create(userInfo, { include: [UserAccount] } );
            if(user_Account.id!==null){
                    //send verification email
                    let hostname = req.headers.host;
                    SendMailVerify(userInfo.email, token, hostname);
                    api_response.response = "success";
                }else{
                    api_response.error = "error";
                }
        }
    }

    res.json(api_response);

};


//hash password
hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};