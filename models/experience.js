'use strict';
module.exports = (sequelize, DataTypes) => {
  const Experience = sequelize.define('Experience', {
    exp_position: DataTypes.STRING,
    exp_company: DataTypes.STRING,
    exp_country: DataTypes.STRING,
    exp_city: DataTypes.STRING,
    exp_from: DataTypes.DATEONLY,
    exp_to: DataTypes.DATEONLY,
    exp_responsibilities: DataTypes.STRING,
    exp_file: DataTypes.STRING
  }, {});
  Experience.associate = function(models) {
    // associations can be defined here
    Experience.belongsTo(models.UserAccount,{
      foreignKey: 'user_account_id',
      onDelete:'CASCADE'
    });
  };
  return Experience;
};