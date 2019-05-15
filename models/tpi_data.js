'use strict'
module.exports = (sequelize, DataTypes) => {
  const TpiData = sequelize.define(
    'tpi_data',
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      tpi_id: DataTypes.INTEGER,
      tpi_data_id: DataTypes.INTEGER
    },
    {}
  )

  TpiData.associate = models => {
    TpiData.belongsTo(models.tpi, {
      foreignKey: 'tpi_id'
    })
  }
  return TpiData
}
