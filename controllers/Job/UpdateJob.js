const Job = require('../../models').Job;
const JobApplication = require('../../models').JobApplication;

module.exports.UpdateJob = async (req, res, next) => {
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
 
         let job_updated = await Job.update(jobDetails, {where:{id:req.params.id}});
         if(job_updated!==null){
             api_response.success ='success';
         }else{
             api_response.error = 'error'
         }
     
}

res.json(api_response);
}

module.exports.DeleteJob = async (req, res, next)=>{
    let api_response = {}
    let jobId = "";
    try{
        jobId = req.params.id;
    }catch(error){
        console.log(error);
        res.json({"error":"empty_fields"});
    }

    let job_deleted = await Job.destroy({where:{id:jobId}});
    if(job_deleted!==null){
        api_response.success ='success';
    }else{
        api_response.error = 'error'
    }

    res.json(api_response);

}


