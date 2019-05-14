'use strict'
module.exports = (sequelize, DataTypes) => {
  const Organisation = sequelize.define(
    'Organisation',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      logo: DataTypes.STRING,
      type: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {}
  )
  Organisation.associate = function (models) {
    // associations can be defined here
    Organisation.hasMany(models.Project)
  }

  return Organisation
}
