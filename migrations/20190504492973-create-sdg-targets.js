'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sdg_targets', {
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
        type: Sequelize.INTEGER,
        references: {
          model: 'sdgs', // table name
          key: 'id'
        }
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

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sdg_targets')
  }
};
