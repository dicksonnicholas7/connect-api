const UserSkills = require('../../models').UserSkills;
const Portfolio = require('../../models').Portfolio;
const Skills = require('../../models').Skills;
const Experience = require('../../models').Experience;
const UserAccount = require('../../models').UserAccount;
const crypto = require('crypto');
let secret = "connect";
const path = require('path');
const multer = require('multer');
const { result } = require('lodash');



module.exports.GetSingleExpDetails = async (req, res, next) => {
    let cert_id = req.params.id;
    let response;
 
    await Experience.findOne({where:{id:cert_id}}).then(server_response => {
        response = server_response
    }).catch(err => {
        console.log(err)
    })

    console.log(response)

    res.send(response)
}



module.exports.GetAllUserExperience = async (req, res, next) => {
    let userId = req.params.id;

    let all_exp = await Experience.findAll({where:{user_account_id:userId}});

    console.log(all_exp)

    res.json(all_exp);
}




module.exports.UpdateExperienceAgain = async (req, res, next) => {
    let filenameGlobal='';
    const storage = multer.diskStorage({
        destination:'./public/files/experience/',
        filename: function(req,file,cb){
            filenameGlobal=file.fieldname+'-'+Date.now()+path.extname(file.originalname);
            cb(null,filenameGlobal);
        }
    });
        
            const upload = multer({
                storage:storage
            }).single('exp_file');
        
            upload(req,res, async (err)=>{
                if(err){
                    console.log(err.toString());
                }else{
                        let userExperience = {
                            exp_position: req.body.position,
                            exp_company: req.body.company,
                            exp_country: req.body.exp_country,
                            exp_city: req.body.exp_city,
                            exp_from: req.body.exp_start_date,
                            exp_to: req.body.exp_end_date,
                            exp_responsibilities: req.body.responsibilities,
                            // exp_file: filenameGlobal,
                        };

                      console.log(req.body.exp_id)

                let results = await  Experience.update(userExperience, { where: {id:req.body.exp_id}});
              
                 if(results !== null ){
                     console.log('updated')
                     res.redirect("/user/freelancer-profile-view#expSection");
                 }
                    }
                
                });

                

}





module.exports.AddExperienceA = async (req, res, next) => {

    let userId = res.locals.userAccount.user_account_id;




    let filenameGlobal='';
    
    const storage = multer.diskStorage({
        destination:'./public/files/experience/',
        filename: function(req,file,cb){
            filenameGlobal=file.fieldname+'-'+Date.now()+path.extname(file.originalname);
            cb(null,filenameGlobal);
        }
    });
        
            const upload = multer({
                storage:storage
            }).single('exp_file');
        
            upload(req,res,async (err)=>{
                if(err){
                    console.log(err.toString());
                    res.status(400);
                }else{

                    let userExperience = {
                        user_account_id: userId,
                        exp_position: req.body.position,
                        exp_company: req.body.company,
                        exp_country: req.body.exp_country,
                        exp_city: req.body.exp_city,
                        exp_from: req.body.exp_start_date,
                        exp_to: req.body.exp_end_date,
                        exp_responsibilities: req.body.responsibilities,
                        exp_file: filenameGlobal,
                    };
                
                    if(filenameGlobal===""){
                        delete userExperience.exp_file 
                    }

                    let results = await Experience.create(userExperience);

                    if (results !== null ){
                        res.redirect(req.get('referer'));
                       }


                }
            });
   
            
            
}






module.exports.AddExperience = async (req, res, next) => {

    let userId = res.locals.userAccount.user_account_id;

    let profile_percent;

    await UserAccount.findOne({where:{user_account_id:res.locals.userAccount.user_account_id}}).then(response => {
        profile_percent = response.profile_complete_percentage;
    })

    console.log(profile_percent)


    let response = {
        id:0,
        user_account_id: '',
        exp_position: '',
        exp_company: '',
        exp_country: '',
        exp_city: '',
        exp_from:'',
        exp_to: '',
        exp_responsibilities: ''
    }

    let filenameGlobal='';
    
    const storage = multer.diskStorage({
        destination:'./public/files/experience/',
        filename: function(req,file,cb){
            filenameGlobal=file.fieldname+'-'+Date.now()+path.extname(file.originalname);
            cb(null,filenameGlobal);
        }
    });
        
            const upload = multer({
                storage:storage
            }).single('exp_file');
        
            upload(req,res,async (err)=>{
                if(err){
                    console.log(err.toString());
                    res.status(400);
                }else{

                    let userExperience = {
                        user_account_id: userId,
                        exp_position: req.body.position,
                        exp_company: req.body.company,
                        exp_country: req.body.exp_country,
                        exp_city: req.body.exp_city,
                        exp_from: req.body.exp_start_date,
                        exp_to: req.body.exp_end_date,
                        exp_responsibilities: req.body.responsibilities,
                        exp_file: filenameGlobal,
                    };
                
                    if(filenameGlobal===""){
                        delete userExperience.exp_file 
                    }

                    let results = await Experience.create(userExperience);

                    
                   if(results !== null && profile_percent < 70 ){
                    profile_percent += 15;
               await  UserAccount.update({profile_complete_percentage:profile_percent}, {where:{user_account_id:res.locals.userAccount.user_account_id}}).then(ress => {
                req.session.userAccount = ress;
            })

                }


                    response.id = results.id
                    response.user_account_id = results.user_account_id
                    response.exp_position =results.exp_position
                    response.exp_company =results.exp_company
                    response.exp_country =results.exp_country
                    response.exp_city =results.exp_city
                    response.exp_from =results.exp_from
                    response.exp_to =results.exp_to
                    response.exp_responsibilities =results.exp_responsibilities

                    res.send(response);
                }
            });
   
            
            
}


module.exports.UpdateExperience = async (req, res, next) => {
    
    let response = {
        id:0,
        exp_position: '',
        exp_company: '',
        exp_country: '',
        exp_city: '',
        exp_from:'',
        exp_to: '',
        exp_responsibilities: ''
    }

    let filenameGlobal='';
    const storage = multer.diskStorage({
        destination:'./public/files/experience/',
        filename: function(req,file,cb){
            filenameGlobal=file.fieldname+'-'+Date.now()+path.extname(file.originalname);
            cb(null,filenameGlobal);
        }
    });
        
            const upload = multer({
                storage:storage
            }).single('exp_file');
        
            upload(req,res, async (err)=>{
                if(err){
                    console.log(err.toString());
                }else{
                        let userExperience = {
                            exp_position: req.body.position,
                            exp_company: req.body.company,
                            exp_country: req.body.exp_country,
                            exp_city: req.body.exp_city,
                            exp_from: req.body.exp_start_date,
                            exp_to: req.body.exp_end_date,
                            exp_responsibilities: req.body.responsibilities,
                            // exp_file: filenameGlobal,
                        };

                      console.log(req.body.exp_id)

                 await  Experience.update(userExperience, { where: {id:req.body.exp_id}}).then(async upd_res => {
                          let results =  await  Experience.findOne({where:{id:req.body.exp_id}});
                          
                        response.id = results.id;
                        response.exp_company = results.exp_company;
                        response.exp_country = results.exp_country;
                        response.exp_position = results.exp_position;
                        response.exp_city = results.exp_city;
                        response.exp_from = results.exp_from;
                        response.exp_to = results.exp_to;
                        response.exp_responsibilities = results.exp_responsibilities;
                   })
                   console.log(response)
                        res.send(response);
                    }
});
}


module.exports.DeleteExperience = async(req, res, next) => {
    let experienceId = req.params.id;

    Experience.destroy({where:{id:experienceId}}).then(destroy_res => {
        res.redirect(req.get('referer'));
    }).catch(err=>{
        console.log(err)
    })
}


//hash password
hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};