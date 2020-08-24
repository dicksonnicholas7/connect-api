
/** importing dependencies and models
 * 
 * 
 * 
 */

const UserSkills = require('../../models').UserSkills;
const Portfolio = require('../../models').Portfolio;
const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const crypto = require('crypto');
let secret = "connect";
const path = require('path');
const multer = require('multer'); 
const axios = require('axios');


module.exports.UploadProfilePicture = (req, res, next) => {
    let filenameGlobal='';

    const storage = multer.diskStorage({
        destination:'./public/images/users/individual/',
        filename: function(req,file,cb){
            filenameGlobal=file.fieldname+'-'+Date.now()+path.extname(file.originalname);
            cb(null,filenameGlobal);
        }
    });

    const upload = multer({
        storage:storage
    }).single('profile_picture');

    upload(req,res, async (err)=>{
        if(err){
            console.log(err.toString());
        }else{
              
            console.log("uploaded");

            User.update({picture:filenameGlobal}, { where: {user_account_id:res.locals.userAccount.user_account_id} }).then( server_res => {
               UserAccount.findOne({where:{user_account_id:res.locals.userAccount.user_account_id}, include:User}).then(useracc => {
                req.session.userAccount = useracc;
                req.session.user = useracc.User;
                if(res.locals.userAccount.role_id == 2){
                    res.redirect(req.get('referer'));
                }else{
                    res.redirect(req.get('referer'));
                } 
                console.log("saved");
               });     
            }).catch(e => {
                console.log(e);
            })
        }
});

}


module.exports.UpdateClientProfile = async (req, res, next) => {


    //use multer to upload file to public/images folder
    let filenameGlobal='';
    const storage = multer.diskStorage({
        destination:'./public/images/users/individual/',
        filename: function(req,file,cb){
            filenameGlobal=file.fieldname+'-'+Date.now()+path.extname(file.originalname);
            cb(null,filenameGlobal);
        }
    });

    const upload = multer({
        storage:storage
    }).single('profile_picture');

    upload(req,res, async (err)=>{
        if(err){
            console.log(err.toString());
        }else{
              
            console.log("uploaded");

//get use details from view and assign to object variable
            let userDetails = {
                first_name: req.body.firstname,
                last_name: req.body.lastname,
                job_title: req.body.jobtitle || '',
                availability: req.body.availability || '',
                golden_paragraph: req.body.golden_paragraph || '',
                date_of_birth:req.body.date_of_birth || '',
                gender:req.body.gender || '',
                country: req.body.country,
                city: req.body.city,
                email: req.body.email,
                country_code: req.body.country_code,
                phone: req.body.phone || '',
                picture: filenameGlobal
            };
   
            if(filenameGlobal===""){
                delete userDetails.picture
            }
        
             User.update(userDetails, { where: {user_account_id:req.body.id} }).then( server_res => {

                UserAccount.findOne({where:{user_account_id:req.body.id}}).then(user_res => {
                    req.session.userAccount = user_res;
                });

                 User.findOne({where:{user_account_id:req.body.id}}).then(user_details => {
                    req.session.user = user_details;

                    let res_user = user_details;

                      //Get list of countries from an external api
      let country = [];
      axios.get('https://restcountries.eu/rest/v2/all')
          .then(response => {
              country = response.data;
              req.session.profileChangeMessage = "";
              res.render(
                'profile/viewing-profile/client-view',
                {
                    country,
                    res_user,
                    page: ''
                }
            )
          })
          .catch(error => {
              //api fails, add some countries
              console.log(error);
              country = [
                  {name: 'Ghana'},
                  {name: 'Germany'},
              ];
              res.render(
               'profile/viewing-profile/client-view',
               {
                   country,
                   res_user,
                   page: ''
               }
           )
          });


                });
            })

        }
    });
}



//update profile. Will remove picture adding from server side and use js to do it later
module.exports.UpdateProfile = async (req, res, next) => {

    console.log("Logging body from profile");
    console.log(req.body);
    let response = {
        first_name: '',
        last_name: '',
        job_title: '',
        availability: '',
        golden_paragraph: '',
        date_of_birth:'',
        gender:'',
        country: '',
        city: '',
        email: '',
        country_code: '',
        phone: ''
    }

    //use multer to upload file to public/images folder
    let filenameGlobal='';
    const storage = multer.diskStorage({
        destination:'./public/images/users/individual/',
        filename: function(req,file,cb){
            filenameGlobal=file.fieldname+'-'+Date.now()+path.extname(file.originalname);
            cb(null,filenameGlobal);
        }
    }); 

    const upload = multer({
        storage:storage
    }).single('profile_picture');

    upload(req,res,(err)=>{
        if(err){
            console.log(err.toString());
        }else{
              
            console.log("uploaded");

//get use details from view and assign to object variable
            let userDetails = {
                first_name: req.body.firstname,
                last_name: req.body.lastname,
                job_title: req.body.jobtitle || '',
                availability: req.body.availability || '',
                golden_paragraph: req.body.golden_paragraph || '',
                date_of_birth:req.body.date_of_birth || '',
                gender:req.body.gender || '',
                country: req.body.country,
                city: req.body.city,
                email: req.body.email,
                country_code: req.body.country_code,
                phone: req.body.phone || '',
                picture: filenameGlobal
            };
            console.log(userDetails)
            if(filenameGlobal===""){
                delete userDetails.picture
            }
            User.update(userDetails, { where: {user_account_id:req.body.id} }).then(response =>{
                req.session.profileChangeMessage = response != null;
                UserAccount.findOne({ where:{user_account_id:res.locals.userAccount.user_account_id}, include: User}).then(async server_response=>{
                     req.session.userAccount = server_response;
                     req.session.user = server_response.User;
                     console.log(response);
                     console.log('updated')

                     if(server_response.profile_complete_percentage < 70){
                        await UserAccount.update({profile_complete_percentage:30}, {where:{user_account_id:server_response.user_account_id}}).then(ress => {
                            req.session.userAccount = ress;
                        })
                     }



                     response.first_name = server_response.User.first_name
                     response.last_name = server_response.User.last_name
                     response.job_title = server_response.User.job_title
                     response.availability = server_response.User.availability
                     response.golden_paragraph= server_response.User.golden_paragraph
                     response.date_of_birth= server_response.User.date_of_birth
                     response.gender= server_response.User.gender
                     response.country = server_response.User.country
                     response.city= server_response.User.city
                     response.email = server_response.User.email
                     response.country_code = server_response.User.country_code
                     response.phone= server_response.User.phone


                     console.log(response)

                     if(server_response.first_time){
                         if(res.locals.userAccount.role_id === 2){
                            // res.redirect('/user/complete-freelancer-skills');
                            console.log(server_response)
                            res.status(200);
                            response.success = server_response;
                            response.error = '';
                         }else if(res.locals.user.RoleId === 1){
                             UserAccount.update({first_time:false}, {where:{user_account_id:res.locals.userAccount.user_account_id}});
                            // res.redirect('/user/dashboard-client');
                            res.status(200);
                         }
                     }
                 });
            }).catch(err => {

                res.status(400);

            });

            res.send(response)
        }
    });
};



module.exports.UpdateFreelancerProfile = async (req, res, next) => {

    let response ={
        error:'',
        success:''
    }


    //use multer to upload file to public/images folder
    let filenameGlobal='';
    const storage = multer.diskStorage({
        destination:'./public/images/users/individual/',
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
             
            console.log("uploaded");

//get use details from view and assign to object variable
            let userDetails = {
                first_name: req.body.firstname,
                last_name: req.body.lastname,
                job_title: req.body.jobtitle || '',
                availability: req.body.availability || '',
                golden_paragraph: req.body.golden_paragraph || '',
                date_of_birth:req.body.date_of_birth || '',
                gender:req.body.gender || '',
                country: req.body.country,
                city: req.body.city,
                email: req.body.email,
                country_code: req.body.country_code,
                phone: req.body.phone || '',
                picture: filenameGlobal
            };

            console.log(userDetails)
            if(filenameGlobal===""){
                delete userDetails.picture
            }
            User.update(userDetails, { where: {user_account_id:req.body.id} }).then(response =>{
                req.session.profileChangeMessage = response != null;
                UserAccount.findOne({ where:{user_account_id:res.locals.userAccount.user_account_id}, include: User}).then(rows=>{
                     req.session.userAccount = rows;
                     req.session.user = rows.User;
                     res.status(200);
                     response.error = '';
                     response.success = 'success'
                 });
            });
        }
    });

    res.json(response);

};


//hash password
hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};