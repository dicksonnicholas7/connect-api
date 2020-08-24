const { Op, where } = require('sequelize');
const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const crypto = require('crypto');
let secret = "connect";
const {SendMailResetPassword} = require('./ForgotPasswordMaill');
const validator = require("email-validator");
const jwt = require('jsonwebtoken');
 
//render forgot password page




module.exports.GetResendPasswordLink = (req, res, next) => {
    res.render('auth/resend-password-link')
}





module.exports.GetForgotPassword = async (req, res, next) => {
    res.locals.display = false;
    res.render(
        'auth/forgot-password',
        {
            page: 'forgot-password'
        }
    );
};
   
//render forgot password page
module.exports.GetReset = async (req, res, next) => {
    res.locals.display = false;
    res.render(
        'auth/reset-password', {
            page: 'reset-password'
        }
    );
};

//render reset password page
module.exports.GetResetPassword = async (req, res, next) => {
    res.locals.display = false;
    let token = req.params.token;
    let email = req.params.email;
    res.locals.email = email;


    let userAccount = await UserAccount.findOne({where:{email:email}});


    res.locals.correct = false;
    (token === userAccount.resetPasswordToken) ? res.locals.correct = true : res.locals.correct = false;
    res.render(
        'auth/reset-password',
        {
            correct:res.locals.correct,
            page: 'reset-password'
        }
    );
};
 
// perform password reset by generating a token plus a link amd sending to user email if email exists
module.exports.forgotPasswordEmail = async (req,res,next)=>{

    res.locals.display = true;
  
if(validator.validate(req.body.email)){
    
                let users = await UserAccount.findOne({where:{email:req.body.email}});

                if(!req.body.email || !users ){
                            res.locals.emailNotFound = true;
                            res.render(
                                'auth/forgot-password',
                                {
                                    emailNotFound: res.locals.emailNotFound,
                                    page: 'forgot-password'
                                }
                            )
                }else{
             //generate a token for email verification
                const token = jwt.sign(
                    { userId: req.body.email },
                    'connect',
                    { expiresIn: 900000 });

                   await UserAccount.update({resetPasswordToken:token}, {where:{user_account_id:users.user_account_id}}).then(server_response => {
                        console.log("Token:  " + token);
                        let hostname = req.headers.host;
                        //send reset link to email
                        res.locals.emailSent = !!SendMailResetPassword(req.body.email, token, hostname);
                        res.render(
                            'auth/reset-password-mail',
                            {
                                emailSent: res.locals.emailSent,
                                page: 'reset-password-mail'
                            }
                        )
                    }).catch(err => {

                        console.log(err);

                    });
 
                }

    }else{

        res.locals.emailInvalid = true;
        res.render(
            'auth/forgot-password',
            {
                emailInvalid: res.locals.emailInvalid,
                page: 'forgot-password'
            }
        )


    }

 
    
};

//perform password
module.exports.DoResetPassword = async (req,res,next)=>{

    let response = {
        status:''
    }


    if(req.body.password !== req.body.conpassword) {
        console.log('do not match')
    }else{
        res.locals.display = true;
        res.locals.correct = true;
        let email = req.body.email;

        let newPassword = {
            password: hashPassword(req.body.password)
        };
    
        let upd_userAccount = await UserAccount.update(newPassword,{ where:{email:email}});
        res.locals.changed = false;
        (upd_userAccount!==null) ? response.status = 'success' : response.status = 'error';
        if(upd_userAccount !== null) {
            await UserAccount.update({resetPasswordToken:''}, {where:{email:email}});
        }
        console.log("changed");
        // res.render(
        //     'auth/reset-password-success',
        //     {
        //         changed:res.locals.changed,
        //         page: 'reset-password-success'
        //     }
        // );

        
    }
    
    res.json(response);
};

//hash password
hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};