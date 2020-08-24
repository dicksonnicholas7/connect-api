const Portfolio = require('../../models').Portfolio;
const crypto = require('crypto');
let secret = "connect";
const path = require('path');
const multer = require('multer');



module.exports.AddPortfolio = async (req, res, next) =>{

    let response = {
        error: '',
        success: ''
    }
    
    let filenameGlobal='';
    const storage = multer.diskStorage({
        destination:'./public/images/portfolio/',
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
            res.status(400);
            response.error = err;
            response.success = ''
            // res.redirect('/user/portfolios');  
        }else{
            console.log("uploaded");
            let userPortfolio = {
                user_account_id: req.body.id,
                portfolio_title: req.body.title,
                portfolio_description: req.body.description,
                portfolio_project_link: req.body.projectLinks,
                portfolio_picture: filenameGlobal
            };
            if(filenameGlobal===""){
                delete userPortfolio.picture
            }
            Portfolio.create(userPortfolio).then(server_response =>{
                // if(res.locals.user.firstTime){
                //     res.redirect('/user/complete-freelancer-skills');
                // }else{
                    
                // }
                res.status(200);
                response.error = '';
                response.success = server_response
                
            }).catch(error => {

                res.status(400);
                response.error = error;
                response.success = ''; 
                
            });
        }
    });

    res.json(response);
};


//update user portfolio with picture upload
module.exports.UpdatePortfolio = async (req, res, next) => {

    let response = {
        error:'',
        success:''
    }
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
                res.status(400);
                 response.error = err;
                response.success =''
        }else{
            console.log("uploaded");
            let userPortfolio = {
                portfolio_title: req.body.title,
                portfolio_description: req.body.description,
                portfolio_project_link: req.body.projectLinks,
                portfolio_picture: filenameGlobal
            };
            if(filenameGlobal===""){
                delete userPortfolio.picture
            }
            Portfolio.update(userPortfolio,{where:{user_account_id:req.body.id}}).then(server_response =>{
                req.session.portfoilioChangeMessage = response != null;
                Portfolio.findAll({
                    where:{UserId:res.locals.user.id}
                }).then(rows=>{
                    req.session.user.Portfolio = rows;
                    console.log(response);
                    // res.redirect('/user/portfolio/'+req.body.id+"/success");

                    res.status(200);
                    response.error = '';
                   response.success = server_response;
                });
            }).catch(error => {
                res.status(400);
                response.error = error;
               response.success =''
            })

        }
    });

    res.json(response);
};




module.exports.DeletePortfolio = async (req, res, next) => {
    let response = {
        success:'',
        error:''
    }

    let portfolioId = req.params.id;

    Portfolio.destroy({where:{id:portfolioId}}).then(async (server_response) => {
        let rows = await  UserAccount.findOne({where:{user_account_id:res.locals.userAccount.user_account_id}, included:[User, Education, UserSkills, Experience, Portfolio]});
        req.session.userAccount = rows;
        req.sessions.user = rows.User;
        res.send(200);
        response.success = server_response;
        response.error = ''
    }).catch(error => {
        res.send(400);
        response.success = ''
        response.error = error
    });

    res.json(response);
}

//hash password
hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};