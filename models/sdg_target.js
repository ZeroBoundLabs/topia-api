'use strict'
module.exports = (sequelize, DataTypes) => {
  const SdgTarget = sequelize.define(
    'sdg_target',
    {
      title: DataTypes.STRING,
      sdg_id: DataTypes.INTEGER,
      description: DataTypes.TEXT
    },
    {}
  )
  SdgTarget.associate = function (models) {
    // associations can be defined here
    SdgTarget.belongsTo(models.sdg, {
      foreignKey: 'sdg_id'
    })
  }
  return SdgTarget
}
