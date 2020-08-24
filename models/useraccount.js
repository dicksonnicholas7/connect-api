'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserAccount = sequelize.define('UserAccount', {
    user_account_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
    first_time: DataTypes.BOOLEAN,
    blocked: DataTypes.BOOLEAN,
    profile_complete_percentage:DataTypes.INTEGER,
    approved: DataTypes.BOOLEAN,
    token: DataTypes.STRING,
    email_hash: DataTypes.STRING,
    resetPasswordToken: DataTypes.STRING,
    resetPasswordExpires: DataTypes.DATE,
  }, {});
  UserAccount.associate = function(models) {
    // associations can be defined here

    UserAccount.belongsTo(models.Role, {
        foreignKey: 'role_id',
        onDelete: 'SET NULL'
      });

    UserAccount.hasOne(models.User,{
      foreignKey: 'user_account_id',
      onDelete: 'CASCADE'
    });


    UserAccount.hasMany(models.Job, {
      foreignKey: 'client_id',
      onDelete: 'CASCADE'
    });

    UserAccount.hasMany(models.JobApplication, {
      foreignKey: 'freelancer_id',
      onDelete: 'CASCADE'
    });

    UserAccount.hasOne(models.UserPaymentInfo,{
      foreignKey: 'user_account_id',
      onDelete: 'CASCADE'
    });

    UserAccount.hasMany(models.Notification, {
      foreignKey: 'receiver_id',
      onDelete: 'CASCADE'
    });

    UserAccount.hasMany(models.JobReport, {
      foreignKey: 'user_account_id',
      onDelete: 'CASCADE'
    });

    UserAccount.hasMany(models.JobFiles, {
      foreignKey: 'user_account_id',
      onDelete: 'CASCADE'
    });

    UserAccount.hasMany(models.Portfolio, {
      foreignKey: 'user_account_id',
      onDelete: 'CASCADE'
    });

    UserAccount.hasMany(models.Certification, {
      foreignKey: 'user_account_id',
      onDelete: 'CASCADE'
    });

    UserAccount.hasMany(models.Message, {
      foreignKey: 'sender_id',
      onDelete: 'CASCADE'
    });

    UserAccount.hasMany(models.Message, {
      foreignKey: 'receiver_id',
      onDelete: 'CASCADE'
    });

    
    UserAccount.hasMany(models.UserSkills,{
      foreignKey: 'user_account_id',
      onDelete:'CASCADE'
    });

    UserAccount.hasMany(models.Experience,{
      foreignKey: 'user_account_id',
      onDelete:'CASCADE'
    });

    UserAccount.hasMany(models.Education,{
      foreignKey: 'user_account_id',
      onDelete:'CASCADE'
    });

  };
  return UserAccount;
};