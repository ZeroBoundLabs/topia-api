'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    const Tpi = queryInterface.createTable('tpis', {
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
        type: Sequelize.INTEGER
      },
      sdg_indicator_id: {
        type: Sequelize.INTEGER
      },
      sdg_target_id: {
        type: Sequelize.INTEGER
      },
      sdg_id: {
        type: Sequelize.INTEGER
      },
      tpi_id: {
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

    Tpi.associate = models => {
      Tpi.belongsTo(models.Project, {
        foreignKey: 'project_id'
      })
      Tpi.belongsTo(models.SdgIndicator, {
        foreignKey: 'sdg_indicator_id'
      })
      Tpi.belongsTo(models.SdgTarget, {
        foreignKey: 'sdg_target_id'
      })
      Tpi.belongsTo(models.Sdg, {
        foreignKey: 'sdg_id'
      })
      Tpi.belongsTo(models.Tpi, {
        foreignKey: 'tpi_id'
      })
    }

    const TpiData = queryInterface.createTable('tpi_data', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      tpi_id: {
        type: Sequelize.INTEGER
      },
      tpi_data_id: {
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
    TpiData.associate = models => {
      TpiData.belongsTo(models.Tpi, {
        foreignKey: 'tpi_id'
      })
      TpiData.belongsTo(models.TpiData, {
        foreignKey: 'tpi_data_id'
      })
    }
    return Promise.all([
      Tpi,
      TpiData
    ])
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable('tpis'),
      queryInterface.dropTable('tpi_data')
    ])
  }
}
