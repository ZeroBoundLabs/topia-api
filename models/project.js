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
    coordinates: DataTypes.JSON,
    deletedAt: DataTypes.DATE
  }, {})
  Project.associate = function (models) {
    // associations can be defined here
    Project.belongsTo(models.organisation, { foreignKey: 'organisation_id' })
    Project.belongsToMany(models.sdg_target, {
      otherKey: 'sdg_target_id',
      foreignKey: 'project_id',
      through: 'project_sdg_target'
    })
  }
  return Project
}
