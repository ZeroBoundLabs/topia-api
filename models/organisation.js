'use strict'
module.exports = (sequelize, DataTypes) => {
  const Organisation = sequelize.define('organisation', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    logo: DataTypes.STRING,
    bannerFilename: DataTypes.STRING,
    type: DataTypes.STRING,
    description: DataTypes.STRING(2000),
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deletedAt: {
      type: DataTypes.DATE
    }
  }, {})
  Organisation.associate = function (models) {
    // associations can be defined here
    Organisation.hasMany(models.project, { foreignKey: 'organisation_id' })

    Organisation.belongsToMany(models.user, {
      otherKey: 'user_id',
      foreignKey: 'organisation_id',
      through: 'organisation_user'
    })
  }
  return Organisation
}
