'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tpis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      data: {
        type: Sequelize.STRING
      },
      project_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'projects', // table name
          key: 'id'
        }
      },
      sdg_indicator_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'sdg_indicators', // table name
          key: 'id'
        }
      },
      sdg_target_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'sdg_targets', // table name
          key: 'id'
        }
      },
      sdg_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'sdgs', // table name
          key: 'id'
        }
      },
      tpi_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tpis', // table name
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
    return queryInterface.dropTable('tpis')
  }
}
