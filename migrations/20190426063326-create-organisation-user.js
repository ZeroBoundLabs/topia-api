'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    const OrganisationUser = queryInterface.createTable('organisation_users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role: {
        type: Sequelize.STRING
      },
      organisation_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'organisations', // table name
          key: 'id'
        }
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // table name
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })

    return OrganisationUser
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.dropTable('organisation_users')])
  }
}
