'use strict'
module.exports = (sequelize, DataTypes) => {
  const ProjectTpi = sequelize.define(
    'ProjectTpi',
    {
      role: DataTypes.STRING,
      project_id: DataTypes.INTEGER,
      tpi_id: DataTypes.INTEGER
    },
    {}
  )

  ProjectTpi.associate = function (models) {
    // associations can be defined here
    ProjectTpi.belongsTo(models.Project, {
      foreignKey: 'project_id'
    })
    ProjectTpi.belongsTo(models.Tpi, {
      foreignKey: 'tpi_id'
    })
  }

  return ProjectTpi
}
