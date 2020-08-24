'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    role_name: DataTypes.STRING
  }, {});
  Role.associate = function(models) {
    // associations can be defined here
    Role.hasMany(models.UserAccount,{
      foreignKey: 'role_id',
      onDelete: 'SET NULL'
    })
  };
  return Role;
};