'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserPaymentInfo = sequelize.define('UserPaymentInfo', {
    account_number: DataTypes.STRING
  }, {});
  UserPaymentInfo.associate = function(models) {
    // associations can be defined here
    UserPaymentInfo.belongsTo(models.UserAccount,{
      foreignKey: 'user_account_id',
      onDelete: 'CASCADE'
    });
  };
  return UserPaymentInfo;
};