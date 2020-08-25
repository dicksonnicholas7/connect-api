'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    title: DataTypes.STRING,
    message: DataTypes.STRING
  }, {});
  Notification.associate = function(models) {
    // associations can be defined here
    Notification.belongsTo(models.UserAccount,{
      foreignKey:'receiver_id',
      onDelete: 'CASCADE'
    });
  };
  return Notification;
};