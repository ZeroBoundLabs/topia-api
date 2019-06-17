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
          model: 'projects', // table name
          key: 'id'
        }
      },
      currency_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'currencies', // table name
          key: 'id'
        }
      },
      donor_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // table name
          key: 'id'
        }
      },
      ngo_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'organisations', // table name
          key: 'id'
        }
      },
      block_address: {
        type: Sequelize.STRING
      },
      milestone_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'milestones', // table name
          key: 'id'
        }
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.dropTable('transactions')])
  }
};
