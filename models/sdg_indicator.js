'use strict'
module.exports = (sequelize, DataTypes) => {
  const SdgIndicator = sequelize.define(
    'sdg_indicator',
    {
      name: DataTypes.STRING,
      code: DataTypes.STRING,
      sdg_target_id: DataTypes.INTEGER,
      description: DataTypes.TEXT
    },
    {}
  )
  SdgIndicator.associate = function (models) {
    // associations can be defined here
    SdgIndicator.belongsTo(models.sdg_target, {
      foreignKey: 'sdg_target_id'
    })
  }
  return SdgIndicator
}
