'use strict';
module.exports = (sequelize, DataTypes) => {
  const JobReport = sequelize.define('JobReport', {
    job_report: DataTypes.STRING
  }, {});
  JobReport.associate = function(models) {
    // associations can be defined here
    JobReport.belongsTo(models.Job,{
      foreignKey: 'job_id',
      onDelete: 'CASCADE'
    });

    JobReport.belongsTo(models.UserAccount,{
      foreignKey: 'user_account_id',
      onDelete: 'CASCADE'
    });

  };
  return JobReport;
};