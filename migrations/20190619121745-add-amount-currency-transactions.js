'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('transactions', 'amount', {
          type: Sequelize.INTEGER, defaultValue: null
        }, { transaction: t }),
        queryInterface.addColumn('transactions', 'status', {
          type: Sequelize.STRING, defaultValue: null
        }, { transaction: t }),
        queryInterface.addColumn('transactions', 'currency', {
          type: Sequelize.STRING, defaultValue: null
        }, { transaction: t })
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('transactions', 'amount', { transaction: t }),
        queryInterface.removeColumn('transactions', 'status', { transaction: t }),
        queryInterface.removeColumn('transactions', 'currency', { transaction: t })
      ])
    })
  }
}
