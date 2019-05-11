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
      name: {
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

    const SdgTarget = queryInterface.createTable('sdg_target', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      sdg_id: {
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

    SdgTarget.associate = models => {
      SdgTarget.belongsTo(models.Sdg, {
        foreignKey: 'sdg_id'
      })
    }

    const SdgIndicator = queryInterface.createTable('sdg_indicator', {
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
      queryInterface.dropTable('sdg_target'),
      queryInterface.dropTable('sdg_indicator')
    ]);
  }
};
