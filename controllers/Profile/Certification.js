const Certification = require('../../models').Certification;
const UserAccount = require('../../models').UserAccount;
const User = require('../../models').User;
const crypto = require('crypto');
const { response } = require('express');
let secret = "connect";
const multer = require('multer'); 
const path = require('path');

module.exports.GetSingleCertDetails = async (req, res, next) => {
    let cert_id = req.params.id;
    let response;
 
    await Certification.findOne({where:{id:cert_id}}).then(server_response => {
        response = server_response
    }).catch(err => {
        console.log(err)
    })

    console.log(response)

    res.send(response)
}





module.exports.AddCertificationA = async (req, res, next) => {

    let userId = res.locals.userAccount.user_account_id;

        //use multer to upload file to public/images folder
        let filenameGlobal='';
        const storage = multer.diskStorage({
            destination:'./public/files/certification/',
            filename: function(req,file,cb){
                filenameGlobal=file.fieldname+'-'+Date.now()+path.extname(file.originalname);
                cb(null,filenameGlobal);
            }
        });


        const upload = multer({
            storage:storage
        }).single('cert_file');

 
        upload(req,res,async (err)=>{
            if(err){
                console.log(err.toString());
            }else{
             
                     console.log("uploaded");
 
                    let user_certification = {
                        user_account_id:userId,
                        cert_name:req.body.certificate,
                        issued_by: req.body.issued_by,
                        issued_date:req.body.issue_date,
                        valid_till:req.body.valid_till,
                        cert_file: filenameGlobal
                    };


                    let results = await Certification.create(user_certification);

                    if (results !== null ){
                        res.redirect(req.get('referer'));
                       }

    

                }

            });


}



module.exports.AddCertification = async (req, res, next) => {

    let userId = res.locals.userAccount.user_account_id;

    await UserAccount.findOne({where:{user_account_id:res.locals.userAccount.user_account_id}}).then(response => {
        profile_percent = response.profile_complete_percentage;
    })

    console.log(profile_percent)

    let response = {
        id:0,
        user_account_id:'',
        cert_name:'',
        issued_by: '',
        issued_date:'',
        valid_till:''
    }

        //use multer to upload file to public/images folder
        let filenameGlobal='';
        const storage = multer.diskStorage({
            destination:'./public/files/certification/',
            filename: function(req,file,cb){
                filenameGlobal=file.fieldname+'-'+Date.now()+path.extname(file.originalname);
                cb(null,filenameGlobal);
            }
        });


        const upload = multer({
            storage:storage
        }).single('cert_file');

 
        upload(req,res,async (err)=>{
            if(err){
                console.log(err.toString());
            }else{
             
                     console.log("uploaded");
 
                    let user_certification = {
                        user_account_id:userId,
                        cert_name:req.body.certificate,
                        issued_by: req.body.issued_by,
                        issued_date:req.body.issue_date,
                        valid_till:req.body.valid_till,
                        cert_file: filenameGlobal
                    };


                    let results = await Certification.create(user_certification);

                    if(results !== null && profile_percent < 70 ){
                        profile_percent += 15;
                     UserAccount.update({profile_complete_percentage:profile_percent}, {where:{user_account_id:res.locals.userAccount.user_account_id}}).then(ress => {
                        req.session.userAccount = ress;
                    })
                    }
    


                    response.id = results.id
                    response.user_account_id = results.user_account_id 
                    response.cert_name = results.cert_name
                    response.issued_by = results.issued_by
                    response.issued_date = results.issued_date
                    response.valid_till = results.valid_till

                    console.log(response)

                    res.send(response);

                }

            });


}




module.exports.UpdateCertificationAgain = async (req, res, next) => {

    let filenameGlobal='';
    const storage = multer.diskStorage({
        destination:'./public/files/certification/',
        filename: function(req,file,cb){
            filenameGlobal=file.fieldname+'-'+Date.now()+path.extname(file.originalname);
            cb(null,filenameGlobal);
        }
    });
        
            const upload = multer({
                storage:storage
            }).single('cert_file');
        
            upload(req,res, async (err)=>{
                if(err){
                    console.log(err.toString());
                }else{
                        let user_certification = {
                            cert_name:req.body.certificate,
                            issued_by: req.body.issued_by,
                            issued_date:req.body.issue_date,
                            valid_till:req.body.valid_till,
                            // cert_file: filenameGlobal
                            // exp_file: filenameGlobal,
                        };

                      console.log(req.body.cert_id)

                let results = await  Certification.update(user_certification, { where: {id:req.body.cert_id}});

                if(results !== null ){
                    console.log('updated')
                    res.redirect("/user/freelancer-profile-view#certSection");
                }      
                    }
                
                });
}


//update user qualification with picture upload
module.exports.UpdateCertification = async (req, res, next) => {
   
    let response = {
        id:0,
        user_account_id:'',
        cert_name:'',
        issued_by: '',
        issued_date:'',
        valid_till:''
    }

    let filenameGlobal='';
    const storage = multer.diskStorage({
        destination:'./public/files/certification/',
        filename: function(req,file,cb){
            filenameGlobal=file.fieldname+'-'+Date.now()+path.extname(file.originalname);
            cb(null,filenameGlobal);
        }
    });
        
            const upload = multer({
                storage:storage
            }).single('cert_file');
        
            upload(req,res, async (err)=>{
                if(err){
                    console.log(err.toString());
                }else{
                        let user_certification = {
                            cert_name:req.body.certificate,
                            issued_by: req.body.issued_by,
                            issued_date:req.body.issue_date,
                            valid_till:req.body.valid_till,
                            // cert_file: filenameGlobal
                            // exp_file: filenameGlobal,
                        };

                      console.log(req.body.cert_id)

                 await  Certification.update(user_certification, { where: {id:req.body.cert_id}}).then(async upd_res => {
                          let results =  await  Certification.findOne({where:{id:req.body.cert_id}});
                          
                          response.id = results.id
                          response.user_account_id = results.user_account_id 
                          response.cert_name = results.cert_name
                          response.issued_by = results.issued_by
                          response.issued_date = results.issued_date
                          response.valid_till = results.valid_till
                   })
                   console.log(response)
                        res.send(response);
                    }
});

};



module.exports.DeleteCertification = async(req, res, next) => {
    let certId = req.params.id;

    Certification.destroy({where:{id:certId}}).then(cert_res => {
        res.redirect(req.get('referer'));
    }).catch(err => {
        console.log(err)
    });
}



//hash password
hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};