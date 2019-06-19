'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('transactions', 'createdAt', {
          type: Sequelize.DATE, defaultValue: null
        }, { transaction: t }),
        queryInterface.addColumn('transactions', 'updatedAt', {
          type: Sequelize.DATE, defaultValue: null
        }, { transaction: t })
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('transactions', 'createdAt', { transaction: t }),
        queryInterface.removeColumn('transactions', 'updatedAt', { transaction: t })
      ])
    })
  }
}
