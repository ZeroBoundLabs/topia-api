'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('projects', [{
        name: 'Reforestation West-Kalimantan',
        organisation_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Reforestation Pulisan',
        organisation_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Reforestation Masarang mountain ridge, North Sulawesi',
        organisation_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Tasikoki animal rescue centre',
        organisation_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Wale Tu’ana Library',
        organisation_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Sustainable agriculture, assistance small farmers',
        organisation_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return true
  }
};



