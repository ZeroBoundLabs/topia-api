'use strict'
module.exports = (sequelize, DataTypes) => {
  const SdgTarget = sequelize.define(
    'SdgTarget',
    {
      name: DataTypes.STRING,
      sdg_id: DataTypes.INTEGER,
      description: DataTypes.TEXT
    },
    {}
  )
  SdgTarget.associate = function (models) {
    // associations can be defined here
    SdgTarget.belongsTo(models.Sdg, {
      foreignKey: 'sdg_id'
    })
  }
  return SdgTarget
}
