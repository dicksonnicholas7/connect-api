const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const crypto = require('crypto');
let secret = "connect";
const jwt = require('jsonwebtoken');
const {SendMailVerify} = require('./VerificationEmail');
const validator = require("email-validator");


module.exports.EmailVerify = (req, res, next) => {
    res.render('email-verify', {hostname:'', emailReceiver:'', token:''})
}

module.exports.GetSignUp = (req, res, next ) => {

    if(req.session.loggedIn===true){
        res.redirect('/');
    }else{ 
        res.render(
                'auth/signup',
                {
                    page:'signup',
                    signUpErrorMessage:'',
                    signUpSuccessMessage:''
                }
            );
    }
};



module.exports.DoSignUp = async (req, res, next) => {


    let response = {
        status:''
    }

    console.log(req.body.password )
    console.log(req.body.conpassword  )
    console.log(req.body.role)

   if(req.body.password !== req.body.conpassword ){
        response.status = "error"
   }else{
    if(validator.validate(req.body.email)){
        if(checkStrength(req.body.password ) !== 'Weak'){

                     //generate a token for email verification
        const token = jwt.sign(
            { userId: req.body.email },
            'connect',
            { expiresIn: '24h' });

                let userInfo = {
                    email: req.body.email,
                    password: hashPassword(req.body.password),
                    role_id: req.body.role,
                    verified: false,
                    first_time: true,
                    approved: false,
                    profile_complete_percentage:0,
                    blocked: false,
                    token: token,
                    email_hash: hashPassword(req.body.email)
                }
    
            //check if email is already used
        let user = await UserAccount.findOne({ where:{email:req.body.email} });
    
        if(user!==null && user.email===req.body.email){
    
            // console.log("User already exists. Log in");
    
            // res.render(
            //     'auth/signup',
            //     {
            //         page:'signup',
            //         signUpErrorMessage:'',
            //         signUpSuccessMessage:''
            //     }
            // );

            response.status = "exist"
    
        }else{

            let user_Account = await UserAccount.create(userInfo);

            if(user_Account.user_account_id!==null){
    
                let individual_info = {
                    user_account_id: user_Account.user_account_id,
                    first_name: '',
                    last_name:'',
                    job_title:'',
                    availability:'',
                    golden_paragraph:'',
                    gender:'',
                    date_of_birth:'',
                    phone:'',
                    country:'',
                    city:'',
                    country_code:''
                };


                let individual_user_details = User.create(individual_info);
    
                if(individual_user_details.id !== null){
                    console.log("Account Created successfully");
    
                    let hostname = req.headers.host;
                    try{
                        req.session.uemail = userInfo.email;
                        req.session.utoken = token;
                    }catch(e){
                        console.log(e);
                    }


                    //send verification email
                    SendMailVerify(userInfo.email, token, hostname);
        
                    // res.render(
                        
                    //     "auth/success-register",
                        
                    //     {
                    //         hostname:hostname,
                    //         email:userInfo.email,
                    //         token:token,
                    //         page:'signup',
                    //         signUpSuccessMessage:''
                    //     });

        
                    response.status = "success"

                        
                }else{
                    console.log("Error creating account ");
                    // res.render(
                    //     'auth/signup',
                    //     {
                    //         page:'signup',
                    //         signUpErrorMessage:'Error creating account ',
                    //         signUpSuccessMessage:''
                    //     }
                    // );
                }
            }
            }
        }else{
            // res.render(
            //     'auth/signup',
            //     {
            //         page:'signup',
            //         signUpErrorMessage:'Enter a valid email address',
            //         signUpSuccessMessage:''
            //     }
            // )

            response.status = "weak"
    
        }

        }else{

        }
   }
   res.json(response);

};


module.exports.ResendVerificationEmail = async (req, res, next ) => {
                        //send verification email

                        let userInfo = {
                            email:req.body.email,
                            token:req.body.token,
                            hostname:req.body.hostname
                        }

                        SendMailVerify(userInfo.email, userInfo.token, userInfo.hostname);
        
                        res.render(
                            
                            "auth/verification-resend",
                            
                            {
                                email:userInfo.email,
                                token:userInfo.token,
                                hostname:userInfo.hostname,
                                page:'verification-resend'
                            });
}



function checkStrength(password) {
    var strength = 0
    if (password.length > 7) strength += 1;
    // If password contains both lower and uppercase characters, increase strength value.
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1;
    // If it has characters, increase strength value.
    if (password.match(/([a-zA-Z])/)) strength += 1;
    // If it has numbers, increase strength value.
    if (password.match(/([0-9])/)) strength += 1;
    // If it has one special character, increase strength value.
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1;
    // If it has two special characters, increase strength value.
    if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1;
    // Calculated strength value, we can return messages
    // If value is less than 2
    if (strength < 5) {
        return 'Weak'
    } else {
        return 'Strong'
    }
};



//hash password
hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};
