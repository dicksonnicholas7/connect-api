const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const Portfolio = require('../../models').Portfolio;



module.exports.GetUserPortfolios = async (req, res, next) => {
    let api_response = {
        error:'',
        success:'',
        response:''
    }

    if(!req.params.userid){
        api_response.error = 'empty_field'
    }else{
        let user_portfolios = Portfolio.findAll({where:{userId:req.params.userid}});
        if(user_portfolios!==null){
            api_response.success = 'success';
            api_response.response = user_portfolios;
        }else{
            api_response.error = 'error';
        }
    }

    res.json(api_response);

}


module.exports.AddPortfolioUser = async (req, res, next) =>{
    let api_response = {
        error: '',
        response: '',
    };
    let userPortfolio = {};
    try{
        userPortfolio = {
            UserId: req.body.userid,
            title: req.body.title,
            description: req.body.description,
            projectLinks: req.body.projectLinks,
        };
    }catch(error){
        console.log(error);
        api_response.error = "empty_fields";
    }
    let portfolio_added = Portfolio.create(userPortfolio);
    if(portfolio_added!==null){
        api_response.success = "success";
    }else{
        api_response.error = "error";
    }
    res.json(api_response);
};

module.exports.AddPortfolioBusiness = async (req, res, next) =>{
    let api_response = {
        error: '',
        response: '',
    };
    let userPortfolio = {};
    try{
        userPortfolio = {
            BusinessPortId: req.body.busid,
            title: req.body.title,
            description: req.body.description,
            projectLinks: req.body.projectLinks,
        };
    }catch(error){
        console.log(error);
        api_response.error = "empty_fields";
    }
    let portfolio_added = Portfolio.create(userPortfolio);
    if(portfolio_added!==null){
        api_response.success = "success";
    }else{
        api_response.error = "error";
    }
    res.json(api_response);
  
};

module.exports.UpdatePortfolioUser = async (req, res, next) => {
    let api_response = {
        error: '',
        response: '',
    };
    let userPortfolio = {};
    let portid="";
    try{
        userPortfolio = {
            title: req.body.title,
            description: req.body.description,
            projectLinks: req.body.projectLinks,
        };
        portid = req.body.portfolio_id;
    }catch(error){
        console.log(error);
        api_response.error = "empty_fields";
    }
    let portfolio_updated = Portfolio.update(userPortfolio, { where:{id:portid} });
    if(portfolio_updated!==null){
        api_response.success = "success";
    }else{
        api_response.error = "error";
    }

    res.json(api_response);
};

module.exports.UpdatePortfolioBusiness = async (req, res, next) => {
    let api_response = {
        error: '',
        response: '',
    };
    let userPortfolio = {};
    let portid="";
    try{
        userPortfolio = {
            title: req.body.title,
            description: req.body.description,
            projectLinks: req.body.projectLinks,
        };
        portid = req.body.portfolio_id;
    }catch(error){
        console.log(error);
        api_response.error = "empty_fields";
    }
    let portfolio_updated = Portfolio.update(userPortfolio, { where:{id:portid} });
    if(portfolio_updated!==null){
        api_response.success = "success";
    }else{
        api_response.error = "error";
    }

    res.json(api_response);
};