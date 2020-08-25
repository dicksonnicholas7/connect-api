'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserSkills = sequelize.define('UserSkills', {
    user_skills_name: DataTypes.STRING
  }, {});
  UserSkills.associate = function(models) {
    // associations can be defined here
    UserSkills.belongsTo(models.UserAccount,{
      foreignKey: 'user_account_id',
      onDelete:'CASCADE'
    });
  };
  return UserSkills;
};