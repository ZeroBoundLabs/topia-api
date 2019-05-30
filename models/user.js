'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    role: DataTypes.STRING,
    avatarFilename: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
    activationToken: DataTypes.STRING
  }, {})
  User.associate = function (models) {
    // associations can be defined here
    User.belongsToMany(models.organisation, {
      otherKey: 'user_id',
      foreignKey: 'organisation_id',
      through: 'organisation_user'
    })
  }
  return User
}
