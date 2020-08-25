'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    chat_message: DataTypes.STRING
  }, {});
  Chat.associate = function(models) {
    Chat.belongsTo(models.Job, {
      foreignKey: 'job_id',
      onDelete: 'CASCADE'
    });
  };
  return Chat;
};