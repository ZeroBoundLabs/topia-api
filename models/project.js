'use strict'
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    organisation_id: DataTypes.INTEGER
  }, {})
  Project.associate = function (models) {
    // associations can be defined here
  }
  return Project
}
