'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Education', {
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
          edu_degree: {
            type: Sequelize.STRING
          },
          edu_programme: {
            type: Sequelize.STRING
          },
          edu_university: {
            type: Sequelize.STRING
          },
          edu_country: {
            type: Sequelize.STRING
          },
          edu_project: {
            type: Sequelize.STRING
          },
          edu_file: {
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
    return queryInterface.dropTable('Education');
  }
};'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Education', {
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
      edu_degree: {
        type: Sequelize.STRING
      },
      edu_programme: {
        type: Sequelize.STRING
      },
      edu_university: {
        type: Sequelize.STRING
      },
      edu_country: {
        type: Sequelize.STRING
      },
      edu_project: {
        type: Sequelize.STRING
      },
      edu_file: {
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
    return queryInterface.dropTable('Education');
  }
};