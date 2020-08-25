'use strict';
module.exports = (sequelize, DataTypes) => {
  const Education = sequelize.define('Education', {
    edu_degree: DataTypes.STRING,
    edu_programme: DataTypes.STRING,
    edu_university: DataTypes.STRING,
    edu_country: DataTypes.STRING,
    edu_project: DataTypes.STRING,
    edu_file: DataTypes.STRING
  }, {});
  Education.associate = function(models) {
    // associations can be defined here
    Education.belongsTo(models.UserAccount,{
      foreignKey: 'user_account_id',
      onDelete:'CASCADE'
    });
  };
  return Education;
};