'use strict'
module.exports = (sequelize, DataTypes) => {
  const OrganisationUser = sequelize.define(
    'OrganisationUser',
    {
      role: DataTypes.STRING,
      organisation_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER
    },
    {}
  )

  OrganisationUser.associate = function (models) {
    // associations can be defined here
    OrganisationUser.belongsTo(models.Organisation, {
      foreignKey: 'organisation_id'
    })
    OrganisationUser.belongsTo(models.User, {
      foreignKey: 'user_id'
    })
  }

  return OrganisationUser
}
