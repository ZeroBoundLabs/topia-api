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
        type: Sequelize.STRING
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



    const OrganisationUser = queryInterface.createTable('organisation_user', {
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
        type: Sequelize.INTEGER
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
      OrganisationUser.belongsTo(models.User, {
        foreignKey: 'user_id'
      })
      OrganisationUser.belongsTo(models.Organisation, {
        foreignKey: 'organisation_id'
      })
    }
    return Promise.all([
      OrganisationUser,
      Organisation
    ])
    //return OrganisationUser
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('organisation_user')
  }
}
