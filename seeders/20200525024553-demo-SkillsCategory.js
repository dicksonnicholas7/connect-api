'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SkillsCategories', [{
      id: 1,
      skills_cat_name: 'Information Technology',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SkillsCategories', null, {});
  }
};
