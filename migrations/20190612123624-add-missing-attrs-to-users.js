'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('users', 'twitter', {
          type: Sequelize.STRING, defaultValue: null
        }, { transaction: t }),
        queryInterface.addColumn('users', 'facebook', {
          type: Sequelize.STRING, defaultValue: null
        }, { transaction: t }),
        queryInterface.addColumn('users', 'linkedin', {
          type: Sequelize.STRING, defaultValue: null
        }, { transaction: t })
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('users', 'facebook', { transaction: t }),
        queryInterface.removeColumn('users', 'twitter', { transaction: t }),
        queryInterface.removeColumn('users', 'linkedin', { transaction: t })
      ])
    })
  }
}
