'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserTypes',[
      {
        id: 1,
        name: 'Regular User'
      },
      {
        id: 2,
        name: 'Business User'
      }

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserTypes', null, {});
  }
};
