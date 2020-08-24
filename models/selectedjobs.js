'use strict';
module.exports = (sequelize, DataTypes) => {
  const SelectedJobs = sequelize.define('SelectedJobs', {
  }, {});

  SelectedJobs.associate = function(models) {
    // associations can be defined here
    SelectedJobs.belongsTo(models.UserAccount,{
      foreignKey: 'client_id',
      onDelete: 'CASCADE'
    });

    SelectedJobs.belongsTo(models.UserAccount,{
      foreignKey: 'freelancer_id',
      onDelete: 'CASCADE'
    });

    SelectedJobs.belongsTo(models.Job,{
      foreignKey: 'job_id',
      onDelete: 'CASCADE'
    });
  };
  return SelectedJobs;
};