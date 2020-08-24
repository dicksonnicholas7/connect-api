const UserAccount = require('../models').UserAccount;

module.exports.checkLoggedIn = async (req, res, next)=>{
    let token = "";
    if(req.headers.authorization){
        token = req.headers.authorization;
    }else{
        console.log("could not get auth header");
        res.json({"error":"no_token"})
    }

    let user_token = await UserAccount.findOne({where:{token}});
    if(user_token!==null){
        next();
    }else{
        res.json({"error":"invalid_token"});
    }

};
