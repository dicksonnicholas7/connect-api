'use strict';
module.exports = (sequelize, DataTypes) => {
  const PaymentDetails = sequelize.define('PaymentDetails', {
    payment_email: DataTypes.STRING,
    apikey: DataTypes.STRING
  }, {});
  PaymentDetails.associate = function(models) {
    PaymentDetails.belongsTo(models.UserAccount, {
        foreignKey: 'user_account_id',
        onDelete: 'CASCADE'
      });
  };
  return PaymentDetails;
};