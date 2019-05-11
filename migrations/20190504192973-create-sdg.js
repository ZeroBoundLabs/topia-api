'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    const Sdg = queryInterface.createTable('sdgs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      sdg_goal_no: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    const SdgTarget = queryInterface.createTable('sdg_targets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING(2000)
      },
      sdg_id: {
        type: Sequelize.INTEGER
      },
      code: {
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
    });

    SdgTarget.associate = models => {
      SdgTarget.belongsTo(models.Sdg, {
        foreignKey: 'sdg_id'
      })
    }

    const SdgIndicator = queryInterface.createTable('sdg_indicators', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      sdg_target_id: {
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
    });

    SdgIndicator.associate = models => {
      SdgIndicator.belongsTo(models.SdgTarget, {
        foreignKey: 'sdg_target_id'
      })
    }
    return Promise.all([
      Sdg,
      SdgTarget,
      SdgIndicator
    ])

  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable('sdgs'),
      queryInterface.dropTable('sdg_targets'),
      queryInterface.dropTable('sdg_indicators')
    ]);
  }
};
