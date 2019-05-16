'use strict'
module.exports = (sequelize, DataTypes) => {
  const ProjectTpi = sequelize.define(
    'project_tpi',
    {
      role: DataTypes.STRING,
      project_id: DataTypes.INTEGER,
      tpi_id: DataTypes.INTEGER
    },
    {}
  )

  ProjectTpi.associate = function (models) {
    // associations can be defined here
    ProjectTpi.belongsTo(models.project, {
      foreignKey: 'project_id'
    })
    ProjectTpi.belongsTo(models.tpi, {
      foreignKey: 'tpi_id'
    })
  }

  return ProjectTpi
}
