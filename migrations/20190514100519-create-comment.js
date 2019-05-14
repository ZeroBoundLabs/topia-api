'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      value: {
        type: Sequelize.STRING
      },
      // you can use user_id, but then you need to update model
      // Article why we are not using sync: https://codeburst.io/sequelize-migrations-setting-up-associations-985d29b61ee7
      //
      userId: {
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
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('comments')
  }
}
