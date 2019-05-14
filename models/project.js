'use strict'
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('project', {
    name: DataTypes.STRING,
    organisation_id: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {})
  Project.associate = function (models) {
    // associations can be defined here
    Project.belongsTo(models.organisation, { foreignKey: 'organisation_id' })
  }
  return Project
}
