'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Skills', [{
      skills_category_id: 1,
      skills_name: 'JavaScript',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    },
    {
      skills_category_id: 1,
      skills_name: 'Django',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    },
    {
      skills_category_id: 1,
      skills_name: 'Python',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    },
    {
      skills_category_id: 1,
      skills_name: 'Java',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    },
    {
      skills_category_id: 1,
      skills_name: 'Mongo DB',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    },
    {
      skills_category_id: 1,
      skills_name: 'C++',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    },
    {
      skills_category_id: 1,
      skills_name: 'Android',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    },
    {
      skills_category_id: 1,
      skills_name: 'Figma',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    },
    {
      skills_category_id: 1,
      skills_name: 'Angular',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    },
    {
      skills_category_id: 1,
      skills_name: 'Adobe XD',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    },
    {
      skills_category_id: 1,
      skills_name: 'MySQL',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    },
    {
      skills_category_id: 1,
      skills_name: 'Bootstrap',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    },
    {
      skills_category_id: 1,
      skills_name: 'CSS',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    },
    {
      skills_category_id: 1,
      skills_name: 'Kotlin',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    },
    {
      skills_category_id: 1,
      skills_name: 'illustrator',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    },
    {
      skills_category_id: 1,
      skills_name: 'Flutter',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Skills', null, {});
  }
};
