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
    activationToken: DataTypes.STRING,
    bannerFilename: DataTypes.STRING
  }, {})
  User.associate = function (models) {
    // associations can be defined here
    User.belongsToMany(models.organisation, {
      otherKey: 'organisation_id',
      foreignKey: 'user_id',
      through: models.organisation_user
    })
  }
  return User
}
