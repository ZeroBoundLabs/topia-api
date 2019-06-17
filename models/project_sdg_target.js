'use strict'
module.exports = (sequelize, DataTypes) => {
  const ProjectSdgTarget = sequelize.define('project_sdg_target', {
    project_id: DataTypes.INTEGER,
    sdg_target_id: DataTypes.INTEGER
  }, {})
  ProjectSdgTarget.associate = function (models) {
    ProjectSdgTarget.belongsTo(models.project, {
      foreignKey: 'project_id'
    })
    ProjectSdgTarget.belongsTo(models.sdg_target, {
      foreignKey: 'sdg_target_id'
    })
  }
  return ProjectSdgTarget
}
