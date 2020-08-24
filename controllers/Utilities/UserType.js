const UserType = require('../../models').UserType;

module.exports.GetUserTypes = async (req, res, next)=>{
    let usertypes = await UserType.findAll();
    (usertypes!=null)?res.json(usertypes):res.json({"error":"no user types"});
};