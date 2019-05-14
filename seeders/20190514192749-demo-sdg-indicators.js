'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('sdg_indicators', [
      {
        code: '1.1.1',
        title: '',
        description: 'Proportion of population below the international poverty line, by sex, age, employment status and geographical location (urban/rural)',
        sdg_target_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: '1.2.1',
        title: '',
        description: 'Proportion of population living below the national poverty line, by sex and age',
        sdg_target_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: '1.2.2',
        description: 'Proportion of men, women and children of all ages living in poverty in all its dimensions according to national definitions',
        sdg_target_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: '1.3.1',
        description: 'Proportion of population covered by social protection floors/systems, by sex, distinguishing children, unemployed persons, older persons, persons with disabilities, pregnant women, newborns, work-injury victims and the poor and the vulnerable',
        sdg_target_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: '1.4.1',
        description: 'Proportion of population living in households with access to basic services',
        sdg_target_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return true
  }
}
