'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.sequelize.query(
        "UPDATE sdgs SET short_title = 'No poverty' WHERE id=1;"
      ),
      await queryInterface.sequelize.query(
        "UPDATE sdgs SET short_title = 'Zero hunger' WHERE id=2;"
      ),
      await queryInterface.sequelize.query(
        "UPDATE sdgs SET short_title = 'Good health and well-being' WHERE id=3;"
      ),
      await queryInterface.sequelize.query(
        "UPDATE sdgs SET short_title = 'Quality education' WHERE id=4;"
      ),
      await queryInterface.sequelize.query(
        "UPDATE sdgs SET short_title = 'Gender equality' WHERE id=5;"
      ),
      await queryInterface.sequelize.query(
        "UPDATE sdgs SET short_title = 'Clean water and sanitation' WHERE id=6;"
      ),
      await queryInterface.sequelize.query(
        "UPDATE sdgs SET short_title = 'Affordable and clean energy' WHERE id=7;"
      ),
      await queryInterface.sequelize.query(
        "UPDATE sdgs SET short_title = 'Decent work and economic growth' WHERE id=8;"
      ),
      await queryInterface.sequelize.query(
        "UPDATE sdgs SET short_title = 'Industry, innovation and infrastructure' WHERE id=9;"
      ),
      await queryInterface.sequelize.query(
        "UPDATE sdgs SET short_title = 'Reduced inequalities' WHERE id=10;"
      ),
      await queryInterface.sequelize.query(
        "UPDATE sdgs SET short_title = 'Sustainable cities and communities' WHERE id=11;"
      ),
      await queryInterface.sequelize.query(
        "UPDATE sdgs SET short_title = 'Responsible consumption and production' WHERE id=12;"
      ),
      await queryInterface.sequelize.query(
        "UPDATE sdgs SET short_title = 'Climate action' WHERE id=13;"
      ),
      await queryInterface.sequelize.query(
        "UPDATE sdgs SET short_title = 'Life Below Water' WHERE id=14;"
      ),
      await queryInterface.sequelize.query(
        "UPDATE sdgs SET short_title = 'Life on land' WHERE id=15;"
      ),
      await queryInterface.sequelize.query(
        "UPDATE sdgs SET short_title = 'Peace, justice and strong institutions' WHERE id=16;"
      ),
      await queryInterface.sequelize.query(
        "UPDATE sdgs SET short_title = 'Partnerships for the goals' WHERE id=17;"
      )
    ]
  },

  down: (queryInterface, Sequelize) => {
    return true
  }
}
