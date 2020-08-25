'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Experiences', {
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
      exp_position: {
        type: Sequelize.STRING
      },
      exp_company: {
        type: Sequelize.STRING
      },
      exp_country: {
        type: Sequelize.STRING
      },
      exp_city: {
        type: Sequelize.STRING
      },
      exp_from: {
        type: Sequelize.DATEONLY
      },
      exp_to: {
        type: Sequelize.DATEONLY
      },
      exp_responsibilities: {
        type: Sequelize.STRING
      },
      exp_file: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Experiences');
  }
};'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Experiences', {
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
      exp_position: {
        type: Sequelize.STRING
      },
      exp_company: {
        type: Sequelize.STRING
      },
      exp_country: {
        type: Sequelize.STRING
      },
      exp_city: {
        type: Sequelize.STRING
      },
      exp_from: {
        type: Sequelize.DATEONLY
      },
      exp_to: {
        type: Sequelize.DATEONLY
      },
      exp_responsibilities: {
        type: Sequelize.STRING
      },
      exp_file: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Experiences');
  }
};