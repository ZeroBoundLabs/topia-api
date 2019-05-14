'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tpi = sequelize.define('Tpi', {
    name: DataTypes.STRING,
    data: DataTypes.STRING,
    project_id: DataTypes.INTEGER,
    sdg_indicator_id: DataTypes.INTEGER,
    sdg_target_id: DataTypes.INTEGER,
    sdg_id: DataTypes.INTEGER,
    tpi_id: DataTypes.INTEGER
  }, {});
  Tpi.associate = function(models) {
    // associations can be defined here
    Tpi.belongsTo(models.Project, {
      foreignKey: 'project_id'
    })
    Tpi.belongsTo(models.SdgIndicator, {
      foreignKey: 'sdg_indicator_id'
    })
    Tpi.belongsTo(models.SdgTarget, {
      foreignKey: 'sdg_target_id'
    })
    Tpi.belongsTo(models.Sdg, {
      foreignKey: 'sdg_id'
    })
    Tpi.belongsTo(models.Tpi, {
      foreignKey: 'tpi_id'
    })
  };
  return Tpi;
};
