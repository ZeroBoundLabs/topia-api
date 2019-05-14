'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    role: DataTypes.STRING,
    avatarFilename: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {})
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.comment)
  }
  return User
}
