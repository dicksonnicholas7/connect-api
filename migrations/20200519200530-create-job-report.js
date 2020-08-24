'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('JobReports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      job_id:{
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references:{
          model: 'Jobs',
          key:'id'
        }
      },
      user_account_id:{
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references:{
          model: 'UserAccounts',
          key:'user_account_id'
        }
      },
      job_report: {
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
    return queryInterface.dropTable('JobReports');
  }
};