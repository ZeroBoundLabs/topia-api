'use strict'
module.exports = (sequelize, DataTypes) => {
  const Sdg = sequelize.define('sdg', {
    name: DataTypes.STRING,
    sdg_no: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {})
  Sdg.associate = function (models) {
    // associations can be defined here
  }
  return Sdg
}
