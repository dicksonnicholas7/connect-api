'use strict';
module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    job_title: DataTypes.STRING,
    job_details: DataTypes.STRING,
    job_timeLength: DataTypes.STRING,
    job_price: DataTypes.DECIMAL(6, 2),
    job_status: DataTypes.STRING,
    job_jobType: DataTypes.INTEGER,
  }, {}); 
  Job.associate = function(models) {
    // associations can be defined here
    Job.belongsTo(models.UserAccount,{
      foreignKey: 'client_id',
      onDelete: 'CASCADE'
    });

    Job.belongsTo(models.JobCategory,{
      foreignKey: 'job_category_id',
      onUpdate: 'CASCADE'
    });

    Job.hasMany(models.JobSkills,{
      as:'JobSkills',
      foreignKey:'job_id',
      onDelete: 'CASCADE'
    })

    Job.hasMany(models.JobApplication,{
      as:'JobApplication',
      foreignKey:'job_id',
      onDelete: 'CASCADE'
    });

    Job.hasMany(models.JobPayment,{
      foreignKey:'job_id',
      onDelete: 'CASCADE'
    });

    Job.hasMany(models.Chat,{
      foreignKey:'job_id',
      onDelete: 'CASCADE'
    });

    Job.hasOne(models.Contract,{
      foreignKey:'job_id',
      onDelete: 'CASCADE'
    });

    Job.hasMany(models.JobReport,{
      foreignKey:'job_id',
      onDelete: 'CASCADE'
    });

    Job.hasMany(models.JobFiles,{
      foreignKey:'job_id',
      onDelete: 'CASCADE'
    });

    Job.hasMany(models.SelectedJobs,{
      foreignKey:'job_id',
      onDelete: 'CASCADE'
    });
  };
  return Job;
};