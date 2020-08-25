'use strict';
module.exports = (sequelize, DataTypes) => {
  const Portfolio = sequelize.define('Portfolio', {
    portfolio_title: DataTypes.STRING,
    portfolio_description: DataTypes.STRING,
    portfolio_project_link: DataTypes.STRING,
    portfolio_picture: DataTypes.STRING
  }, {});
  Portfolio.associate = function(models) {
    // associations can be defined here
    Portfolio.belongsTo(models.UserAccount, {
      foreignKey: 'user_account_id',
      onDelete: 'CASCADE'
    });
  };
  return Portfolio;
};