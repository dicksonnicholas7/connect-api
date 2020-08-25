const Job = require('../../models').Job;
const JobCategory = require('../../models').JobCategory;


module.exports.DoPostJob = (req, res, next) => {
   let api_response = {
       error:'',
       success:'',
       response:''
   }

   let jobDetails = {};

   if(!req.body.title || !req.body.details || !req.body.timeLength || !req.body.price || !req.body.skills || !req.body.status){
    api_response.error = 'empty_feilds';
   }else{

            jobDetails = {
            clientId:req.body.clientId,
            catId:req.body.catId,
            title:req.body.title,
            details:req.body.details,
            timeLength:req.body.timeLength,
            price:req.body.price,
            skills:req.body.skills,
            status:req.body.status
        }

        let job_posted = Job.create(jobDetails);
        if(job_posted!==null){
            api_response.success ='success';
        }else{
            api_response.error = 'error'
        }
   

}

   res.json(api_response);

};