'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Portfolios', {
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
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      project_link: {
        type: Sequelize.STRING
      },
      picture: {
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
    return queryInterface.dropTable('Portfolios');
  }
};'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Portfolios', {
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
      portfolio_title: {
        type: Sequelize.STRING
      },
      portfolio_description: {
        type: Sequelize.STRING
      },
      portfolio_project_link: {
        type: Sequelize.STRING
      },
      portfolio_picture: {
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
    return queryInterface.dropTable('Portfolios');
  }
};