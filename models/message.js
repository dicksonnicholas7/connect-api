'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    message: DataTypes.STRING
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
    Message.belongsTo(models.UserAccount, {
      foreignKey: 'sender_id',
      onDelete: 'CASCADE',
      as: 'sender',
      constraints: false
    });

    Message.belongsTo(models.UserAccount, {
      foreignKey: 'receiver_id',
      onDelete: 'CASCADE',
      as: 'receiver',
      constraints: false
    });

  };
  return Message;
};