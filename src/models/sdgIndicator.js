'use strict'
module.exports = (sequelize, DataTypes) => {
  const SdgIndicator = sequelize.define(
    'SdgIndicator',
    {
      name: DataTypes.STRING,
      sdg_id: DataTypes.INTEGER,
      description: DataTypes.TEXT
    },
    {}
  )
  SdgIndicator.associate = function (models) {
    // associations can be defined here
    SdgIndicator.belongsTo(models.SdgTarget, {
      foreignKey: 'sdg_target_id'
    })
  }
  return SdgIndicator
}
