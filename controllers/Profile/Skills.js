const Skills = require('../../models').Skills;


module.exports.GetAllUserSkills = async (req, res, next) => {
    let api_response = {
        error:'',
        success:'',
    }

        let user_skills = await Skills.findAll({where:{SkillUserId:req.params.userid}});
        console.log(user_skills)
        if(user_skills!==null){
            api_response.success = 'success';
            api_response.response = user_skills;
        }else{
            api_response.error = 'error'
        }

    res.json(api_response);
}


module.exports.AddSkillUser = async (req, res, next) =>{
    let api_response = {
        error: '',
        success: ''
    };
    let skillset = {};

    try {
        skillset = {
            name: req.body.name,
            details: req.body.details,
            SkillUserId: req.body.userid
        };
    } catch (error) {
        console.log(error);
        res.json({"error":"empty_fields"});
    }

    let skills_added = Skills.create(skillset);
    (skills_added) ? api_response.success = "success" : api_response.error = "error";
    res.json(api_response);
};

module.exports.AddSkillBusiness = async (req, res, next) =>{
    let api_response = {
        error: '',
        success: ''
    };
    let skillset = {};

    try {
        skillset = {
            name: req.body.name,
            details: req.body.details,
            SkillBusId: req.body.busid
        };
    } catch (error) {
        console.log(error);
        res.json({"error":"empty_fields"});
    }

    let skills_added = Skills.create(skillset);
    (skills_added) ? api_response.success = "success" : api_response.error = "error";
    res.json(api_response);
};

module.exports.UpdateSkillUser = async (req, res, next) =>{
    let api_response = {
        error: '',
        success: ''
    };
    let skillset = {};
    let skillid = "";
    try {
        skillset = {
            name: req.body.name,
            details: req.body.details
        };
        skillid = req.body.skillid;
    } catch (error) {
        console.log(error);
        res.json({"error":"empty_fields"});
    }

    let skills_added = Skills.update(skillset, {where: {id:skillid} });
    (skills_added) ? api_response.success = "success" : api_response.error = "error";
    res.json(api_response);

};

module.exports.UpdateSkillBusiness = async (req, res, next) =>{
    let api_response = {
        error: '',
        success: ''
    };
    let skillset = {};
    let skillid = "";
    try {
        skillset = {
            name: req.body.name,
            details: req.body.details
        };
        skillid = req.body.skillid;
    } catch (error) {
        console.log(error);
        res.json({"error":"empty_fields"});
    }

    let skills_added = Skills.update(skillset, {where: {id:skillid} });
    (skills_added) ? api_response.success = "success" : api_response.error = "error";
    res.json(api_response);
};