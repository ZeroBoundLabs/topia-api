'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('badges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
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
      project_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'projects', // table name
          key: 'id'
        }
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.dropTable('badges')])
  }
};
