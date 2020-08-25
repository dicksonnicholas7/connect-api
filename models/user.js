'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    job_title: DataTypes.STRING,
    availability: DataTypes.STRING,
    golden_paragraph: DataTypes.STRING,
    gender: DataTypes.STRING,
    date_of_birth: DataTypes.DATEONLY,
    country_code: DataTypes.STRING,
    phone: {
      type: DataTypes.STRING
    },
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    picture: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.belongsTo(models.UserAccount,{
      foreignKey: 'user_account_id',
      onDelete: 'CASCADE'
    });
  };
  return User;
};