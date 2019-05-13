'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    const seedOrganisations = queryInterface.bulkInsert('organisations', [{
      name: 'Masarang Foundation',
      email: 'info@masarang.com',
      logo: '/logo.png',
      type: 'ngo',
      description: '“Nature conservation through collaboration with and development of the local population.” That is the mission of Masarang, our foundation in Indonesia, founded in 2001 by Dr. Eng. Willie Smits.\n' +
        'Masarang finds solutions for the most urgent global problems of our time: deforestation, biodiversity loss, climate change, poverty and underdevelopment.\n' +
        'rainforest\n' +
        'The activities of Masarang may take place in Indonesia but they play a global role. After all, the problems in Indonesia have an impact on the entire planet. Ongoing deforestation is leading to massive carbon dioxide emissions with great consequences for climate change and the environment. Masarang is tackling these issues at their heart and works to find sustainable solutions which will work long-term.',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})

    const OrganisationUser = queryInterface.bulkInsert('organisation_user', [{
      role: 'admin',
      organisation_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
    return Promise.all([
      seedOrganisations,
      OrganisationUser
    ])
  },

  down: (queryInterface, Sequelize) => {
    return true
  }
}
