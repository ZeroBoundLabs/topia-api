'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sdg = sequelize.define('Sdg', {
    title: DataTypes.STRING,
    sdg_goal_no: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {});
  Sdg.associate = function(models) {
    // associations can be defined here
  };
  return Sdg;
};
