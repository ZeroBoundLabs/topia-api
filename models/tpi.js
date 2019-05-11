'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tpi = sequelize.define('Tpi', {
    name: DataTypes.STRING
  }, {});
  Tpi.associate = function(models) {
    // associations can be defined here
  };
  return Tpi;
};