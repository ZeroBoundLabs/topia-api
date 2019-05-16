'use strict'
module.exports = (sequelize, DataTypes) => {
  const Tpi = sequelize.define(
    'tpi',
    {
      name: DataTypes.STRING,
      data: DataTypes.STRING,
      project_id: DataTypes.INTEGER,
      sdg_indicator_id: DataTypes.INTEGER,
      sdg_target_id: DataTypes.INTEGER,
      sdg_id: DataTypes.INTEGER,
      tpi_id: DataTypes.INTEGER
    },
    {}
  )
  Tpi.associate = function (models) {
    // associations can be defined here
    Tpi.belongsTo(models.project, {
      foreignKey: 'project_id'
    })
    Tpi.belongsTo(models.sdg_indicator, {
      foreignKey: 'sdg_indicator_id'
    })
    Tpi.belongsTo(models.sdg_target, {
      foreignKey: 'sdg_target_id'
    })
    Tpi.belongsTo(models.sdg, {
      foreignKey: 'sdg_id'
    })
    Tpi.belongsTo(models.tpi, {
      foreignKey: 'tpi_id'
    })
  }
  return Tpi
}
