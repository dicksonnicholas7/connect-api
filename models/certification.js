'use strict';
module.exports = (sequelize, DataTypes) => {
  const Certification = sequelize.define('Certification', {
    cert_name: DataTypes.STRING,
    issued_by: DataTypes.STRING,
    issued_date:DataTypes.DATEONLY,
    valid_till: DataTypes.DATEONLY,
    cert_file: DataTypes.STRING
  }, {});
  Certification.associate = function(models) {
    // associations can be defined here
    Certification.belongsTo(models.UserAccount,{
      foreignKey: 'user_account_id',
      onDelete: 'CASCADE'
    });
  };
  return Certification;
};