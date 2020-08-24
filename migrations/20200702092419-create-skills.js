'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Skills', {
    id: {
        allowNull: false,
        autoIncrement: true, 
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      skills_category_id:{
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        references:{
          model: 'SkillsCategories',
          key:'id'
        }
      },
      skills_name: {
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
    return queryInterface.dropTable('Skills');
  }
};'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Skills', {
      id: {
        allowNull: false,
        autoIncrement: true, 
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      skills_category_id:{
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        references:{
          model: 'SkillsCategories',
          key:'id'
        }
      },
      skills_name: {
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
    return queryInterface.dropTable('Skills');
  }
};