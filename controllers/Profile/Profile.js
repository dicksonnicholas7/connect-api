const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const BusinessUser = require('../../models').BusinessUser;
const Skills = require('../../models').Skills;
const crypto = require('crypto');
const {secret} = require('../../config/keys');
const path = require('path');
const multer = require('multer');


module.exports.GetUserProfile = async (req, res, next) => {
    let api_response = {
        error:'',
        success: ''
    }

    if(!req.params.userid){
        api_response.error = 'empty_feild'
    }else{
        let user_profile = await User.findOne({
            where:{id:req.params.userid},
            include:[UserAccount, Skills]
        });
        if(user_profile!==null){
            api_response.success = 'success';
            api_response.response= user_profile;
            console.log(user_profile);
        }else{
            api_response.error = 'error'
        }
    }

    res.json(api_response);
}

//update profile.
module.exports.UpdateProfileUser = async (req, res, next) => {
    let api_response = {
        error:'',
        success:''
    }
    //use multer to upload file to public/images folder
    let filenameGlobal='';
    const storage = multer.diskStorage({
        destination:'./public/images/',
        filename: function(req,file,cb){
            filenameGlobal=file.fieldname+'-'+Date.now()+path.extname(file.originalname);
            cb(null,filenameGlobal);
        }
    });

    const upload = multer({
        storage:storage
    }).single('picture');

    upload(req,res,(err)=>{
        if(err){
            console.log(err.toString());
        }else{
            let userDetails = {};
            console.log("uploaded");
            try{
                userDetails = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    gender: req.body.gender,
                    dob: req.body.dob,
                    jobTitle: req.body.jobTitle || '',
                    email: req.body.email,
                    mobile: req.body.mobile,
                    country: req.body.country,
                    city: req.body.city,
                    picture: filenameGlobal
                };
                userid = req.body.userid;
            }catch(error){
                console.log("error getting fields");
                res.json({"error":"empty_field"});
            } 
            if(filenameGlobal===""){
                delete userDetails.picture
            }
            User.update(userDetails, { where: {id:userid} }).then(response =>{
                 api_response.success = "success";
            }).catch(e =>{
                api_response.error = "error";
            });

        }
    });
    res.json(api_response);

};

module.exports.UpdateProfileBusiness = async (req, res, next) => {
    let api_response = {
        error:'',
        success:''
    }
    //use multer to upload file to public/images folder
    let filenameGlobal='';
    const storage = multer.diskStorage({
        destination:'./public/images/',
        filename: function(req,file,cb){
            filenameGlobal=file.fieldname+'-'+Date.now()+path.extname(file.originalname);
            cb(null,filenameGlobal);
        }
    });

    const upload = multer({
        storage:storage
    }).single('picture');

    upload(req,res,(err)=>{
        if(err){
            console.log(err.toString());
        }else{
            let userbusDetails = {};
            console.log("uploaded");
            try{
                userbusDetails = {
                    name: req.body.name,
                    location: req.body.location,
                    certificate: filenameGlobal
                };
                busid = req.body.busid;
            }catch(error){
                console.log("error getting fields");
                res.json({"error":"empty_field"});
            } 
            if(filenameGlobal===""){
                delete userbusDetails.picture
            }
            BusinessUser.update(userbusDetails, { where: {id:busid} }).then(response =>{
                 api_response.success = "success";
            }).catch(e =>{
                api_response.error = "error";
            });

        }
    });
    res.json(api_response);

};

//hash password
hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};