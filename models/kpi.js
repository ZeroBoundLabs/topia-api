'use strict';
module.exports = (sequelize, DataTypes) => {
  const Kpi = sequelize.define('Kpi', {
    name: DataTypes.STRING,
    organisation_id: DataTypes.INTEGER
  }, {});
  Kpi.associate = function(models) {
    // associations can be defined here
  };
  return Kpi;
};