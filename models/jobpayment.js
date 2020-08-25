'use strict';
module.exports = (sequelize, DataTypes) => {
  const JobPayment = sequelize.define('JobPayment', {
    amount: DataTypes.STRING,
    free_amount: DataTypes.STRING,
    client_payment_receipt: DataTypes.STRING,
    client_pay: DataTypes.BOOLEAN,
    freelance_pay: DataTypes.BOOLEAN
  }, {});
  JobPayment.associate = function(models) {
    // associations can be defined here
    JobPayment.belongsTo(models.Job,{
      foreignKey:'job_id',
      onDelete: 'CASCADE'
    });
  };
  return JobPayment;
};