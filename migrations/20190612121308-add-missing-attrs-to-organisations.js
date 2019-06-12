'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('organisations', 'url', {
          type: Sequelize.STRING, defaultValue: null
        }, { transaction: t }),
        queryInterface.addColumn('organisations', 'foundAt', {
          type: Sequelize.DATE, defaultValue: null
        }, { transaction: t }),
        queryInterface.addColumn('organisations', 'fundsReceived', {
          type: Sequelize.INTEGER, defaultValue: null
        }, { transaction: t })
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('organisations', 'url', { transaction: t }),
        queryInterface.removeColumn('organisations', 'foundAt', { transaction: t }),
        queryInterface.removeColumn('organisations', 'fundsReceived', { transaction: t })
      ])
    })
  }
}
