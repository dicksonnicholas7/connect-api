'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('JobPayments', {
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
      amount: {
        type: Sequelize.STRING
      },
      free_amount: {
        type: Sequelize.STRING
      },
      client_payment_receipt: {
        type: Sequelize.STRING
      },
      client_pay: {
        type: Sequelize.BOOLEAN
      },
      freelance_pay: {
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('JobPayments');
  }
};