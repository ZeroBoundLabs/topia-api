'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    const Organisation = queryInterface.createTable('organisations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      logo: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING(2000)
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

    OrganisationUser.associate = models => {
      OrganisationUser.belongsTo(models.user, {
        foreignKey: 'user_id'
      })
      OrganisationUser.belongsTo(models.organisation, {
        foreignKey: 'organisation_id'
      })
    }
    return Promise.all([
      OrganisationUser,
      Organisation
    ])
    // return OrganisationUser
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable('organisation_users'),
      queryInterface.dropTable('organisations')
    ])
  }
}
