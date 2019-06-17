'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      project_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'projects',
          key: 'id'
        }
      },
      currency_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'currencies',
          key: 'id'
        }
      },
      donor_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      organisation_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'organisations',
          key: 'id'
        }
      },
      block_address: {
        type: Sequelize.STRING
      },
      milestone_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'milestones',
          key: 'id'
        }
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.dropTable('transactions')])
  }
};
