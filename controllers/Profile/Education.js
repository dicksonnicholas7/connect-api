
const UserAccount = require('../../models').UserAccount;
const Portfolio = require('../../models').Portfolio;
const Education = require('../../models').Education;
const crypto = require('crypto');
let secret = "connect";
const path = require('path');
const multer = require('multer');
const { render } = require('ejs');



module.exports.GetSingleEduDetails = async (req, res, next) => {
    let cert_id = req.params.id;
    let response;
 
    await Education.findOne({where:{id:cert_id}}).then(server_response => {
        response = server_response
    }).catch(err => {
        console.log(err)
    })

    console.log(response)

    res.send(response)
}




module.exports.AddEducationA = async (req, res, next) =>{
    let userId = res.locals.userAccount.user_account_id;



    let filenameGlobal='';
    const storage = multer.diskStorage({
        destination:'./public/files/education/',
        filename: function(req,file,cb){
            filenameGlobal=file.fieldname+'-'+Date.now()+path.extname(file.originalname);
            cb(null,filenameGlobal);
        }
    });
        
            const upload = multer({
                storage:storage
            }).single('file');
        
            upload(req,res,async (err)=>{
                if(err){
                    console.log(err.toString());
                    res.status(400);
                }else{

                    let userEducation = {
                        user_account_id:userId,
                        edu_degree: req.body.degree,
                        edu_programme: req.body.program,
                        edu_university: req.body.university,
                        edu_country: req.body.edu_country,
                        edu_project: req.body.project,
                        edu_file:filenameGlobal,
                    };

                
                    if(filenameGlobal===""){
                        delete userEducation.edu_file 
                    }

                   let results = await Education.create(userEducation);

                   if (results !== null ){
                    res.redirect(req.get('referer'));
                   }

                }
            });   
};





module.exports.AddEducation = async (req, res, next) =>{
    let userId = res.locals.userAccount.user_account_id;
    let profile_percent;

    await UserAccount.findOne({where:{user_account_id:res.locals.userAccount.user_account_id}}).then(response => {
        profile_percent = response.profile_complete_percentage;
    })

    console.log(profile_percent)

    let response = {
        id:0,
        user_account_id: '',
        edu_degree: '',
        edu_programme: '',
        edu_university: '',
        edu_country: '',
        edu_project: '',
        edu_file:'',
    }

    let filenameGlobal='';
    const storage = multer.diskStorage({
        destination:'./public/files/education/',
        filename: function(req,file,cb){
            filenameGlobal=file.fieldname+'-'+Date.now()+path.extname(file.originalname);
            cb(null,filenameGlobal);
        }
    });
        
            const upload = multer({
                storage:storage
            }).single('file');
        
            upload(req,res,async (err)=>{
                if(err){
                    console.log(err.toString());
                    res.status(400);
                }else{

                    let userEducation = {
                        user_account_id:userId,
                        edu_degree: req.body.degree,
                        edu_programme: req.body.program,
                        edu_university: req.body.university,
                        edu_country: req.body.edu_country,
                        edu_project: req.body.project,
                        edu_file:filenameGlobal,
                    };

                
                    if(filenameGlobal===""){
                        delete userEducation.edu_file 
                    }

                   let results = await Education.create(userEducation);

                   if(results !== null && profile_percent < 70 ){
                       profile_percent += 15;
                   UserAccount.update({profile_complete_percentage:profile_percent}, {where:{user_account_id:res.locals.userAccount.user_account_id}}).then(ress => {
                       req.session.userAccount = ress;
                   })
                   }


                   console.log(results.edu_university);

                   response.id = results.id;
                   response.edu_country = results.edu_country;
                   response.edu_university = results.edu_university;
                   response.edu_programme = results.edu_programme;
                   response.edu_degree = results.edu_degree;
                   response.user_account_id = results.user_account_id;

                   console.log(response)
                   res.send(response);
                }
            });   
};



module.exports.GetUserEducationList = async (req, res, next) => {
    let userId = req.params.id;

    let edu_results = await Education.findAll({where:{user_account_id:userId}});

    console.log(edu_results);

    res.json(edu_results);
}

module.exports.UpdateEducationAgain = async (req, res, next) => {

    let filenameGlobal='';
    const storage = multer.diskStorage({
        destination:'./public/files/education/',
        filename: function(req,file,cb){
            filenameGlobal=file.fieldname+'-'+Date.now()+path.extname(file.originalname);
            cb(null,filenameGlobal);
        }
    });
        
            const upload = multer({
                storage:storage
            }).single('file');
        
            upload(req,res, async (err)=>{
                if(err){
                    console.log(err.toString());
                }else{
                        let userEducation = {
                            edu_degree: req.body.degree,
                            edu_programme: req.body.program,
                            edu_university: req.body.university,
                            edu_country: req.body.edu_country,
                            edu_project: req.body.project,
                            // edu_file:filenameGlobal,
                        };

                      console.log(req.body.edu_id)

                 let results = await  Education.update(userEducation, { where: {id:req.body.edu_id}});
              
                 if(results !== null ){
                     console.log('updated')
                    res.redirect("/user/freelancer-profile-view#eduSection");
                 }
                        
                    }
                
                });

               

}



//update user education
module.exports.UpdateEducation = async (req, res, next) => {
    let response = {
        id:0,
        user_account_id: '',
        edu_degree: '',
        edu_programme: '',
        edu_university: '',
        edu_country: '',
        edu_project: '',
        edu_file:'',
    }

    let filenameGlobal='';
    const storage = multer.diskStorage({
        destination:'./public/files/education/',
        filename: function(req,file,cb){
            filenameGlobal=file.fieldname+'-'+Date.now()+path.extname(file.originalname);
            cb(null,filenameGlobal);
        }
    });
        
            const upload = multer({
                storage:storage
            }).single('file');
        
            upload(req,res, async (err)=>{
                if(err){
                    console.log(err.toString());
                }else{
                        let userEducation = {
                            edu_degree: req.body.degree,
                            edu_programme: req.body.program,
                            edu_university: req.body.university,
                            edu_country: req.body.edu_country,
                            edu_project: req.body.project,
                            // edu_file:filenameGlobal,
                        };

                      console.log(req.body.edu_id)

                 await  Education.update(userEducation, { where: {id:req.body.edu_id}}).then(async upd_res => {
                          let results =  await  Education.findOne({where:{id:req.body.edu_id}});
                          
                        response.id = results.id;
                        response.edu_country = results.edu_country;
                        response.edu_university = results.edu_university;
                        response.edu_programme = results.edu_programme;
                        response.edu_degree = results.edu_degree;
                        response.user_account_id = results.user_account_id;
                   })
                   console.log(response)
                        res.send(response);
                    }
});


};





module.exports.DeleteEducation = async (req, res, next ) => {
    let educationId = req.params.id;

    Education.destroy({where:{id:educationId}}).then(async (server_response) => {
        console.log('deleted')
        res.redirect(req.get('referer'));
    }).catch(error => {
        console.log(error)
    });

}




//hash password
hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};