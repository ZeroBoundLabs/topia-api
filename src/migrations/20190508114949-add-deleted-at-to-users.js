'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'users',
          'deletedAt',
          {
            type: Sequelize.DATE,
            defaultValue: null
          },
          { transaction: t }
        )
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('users', 'deletedAt', { transaction: t })
      ])
    })
  }
}
