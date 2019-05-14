'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    const User = queryInterface.createTable('users', {
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
      password: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.BOOLEAN
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

    User.associate = models => {
      User.hasMany(models.Project)
    }

    return User
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users')
  }
}
