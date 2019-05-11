'use strict'
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const saltRounds = 12
    const password = '12qwaszx'
    const hashedPass = await bcrypt.hash(password, saltRounds)

    return queryInterface.bulkInsert('users', [
      {
        name: 'John Admin',
        password: hashedPass,
        email: 'admin@topia.io',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return true
  }
}
