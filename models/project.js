'use strict'
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('project', {
    name: DataTypes.STRING,
    organisation_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    fundingAllocated: DataTypes.INTEGER,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    startAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {})
  Project.associate = function (models) {
    // associations can be defined here
    Project.belongsTo(models.organisation, { foreignKey: 'organisation_id' })
  }
  return Project
}
