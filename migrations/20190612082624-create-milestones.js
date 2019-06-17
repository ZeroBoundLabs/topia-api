'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('milestones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
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
    return Promise.all([queryInterface.dropTable('milestones')])
  }
};
