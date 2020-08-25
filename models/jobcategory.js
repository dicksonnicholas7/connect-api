'use strict';
module.exports = (sequelize, DataTypes) => {
  const JobCategory = sequelize.define('JobCategory', {
    job_cat_name: DataTypes.STRING,
    job_cat_picture: DataTypes.STRING
  }, {});
  JobCategory.associate = function(models) {
    // associations can be defined here
    JobCategory.hasMany(models.Job,{
      foreignKey: 'job_category_id',
      onUpdate: 'CASCADE'
    });
  };
  return JobCategory;
};