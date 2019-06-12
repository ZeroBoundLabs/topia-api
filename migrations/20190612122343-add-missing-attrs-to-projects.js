'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('projects', 'description', {
          type: Sequelize.TEXT, defaultValue: null
        }, { transaction: t }),
        queryInterface.addColumn('projects', 'fundingAllocated', {
          type: Sequelize.INTEGER, defaultValue: null
        }, { transaction: t }),
        queryInterface.addColumn('projects', 'lat', {
          type: Sequelize.FLOAT, defaultValue: null
        }, { transaction: t }),
        queryInterface.addColumn('projects', 'lng', {
          type: Sequelize.FLOAT, defaultValue: null
        }, { transaction: t }),
        queryInterface.addColumn('projects', 'startAt', {
          type: Sequelize.DATE, defaultValue: null
        }, { transaction: t })
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('projects', 'fundingAllocated', { transaction: t }),
        queryInterface.removeColumn('projects', 'description', { transaction: t }),
        queryInterface.removeColumn('projects', 'lat', { transaction: t }),
        queryInterface.removeColumn('projects', 'lng', { transaction: t }),
        queryInterface.removeColumn('projects', 'startAt', { transaction: t })
      ])
    })
  }
}
