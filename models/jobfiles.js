'use strict';
module.exports = (sequelize, DataTypes) => {
  const JobFiles = sequelize.define('JobFiles', {
    job_filename: DataTypes.STRING
  }, {});
  JobFiles.associate = function(models) {
    // associations can be defined here
    JobFiles.belongsTo(models.Job,{
      foreignKey: 'job_id',
      onDelete: 'CASCADE'
    });

    JobFiles.belongsTo(models.UserAccount,{
      foreignKey: 'user_account_id',
      onDelete: 'CASCADE'
    });

  };
  return JobFiles;
};