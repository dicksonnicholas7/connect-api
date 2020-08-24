'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Certifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      }, 
      user_account_id:{
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references:{
          model: 'UserAccounts',
          key:'user_account_id'
        }
      },
      cert_name: {
        type: Sequelize.STRING
      },
      issued_by: {
        type: Sequelize.STRING
      },
      issued_date: {
        type: Sequelize.DATEONLY
      },
      valid_till: {
        type: Sequelize.DATEONLY
      },
      cert_file: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Certifications');
  }
};