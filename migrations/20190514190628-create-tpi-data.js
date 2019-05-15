'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tpi_data', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      tpi_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tpis', // table name
          key: 'id'
        }
      },
      tpi_data_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tpi_data', // table name
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
    return queryInterface.dropTable('tpi_data')
  }
}
