'use strict'
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment', {
    value: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {})
  Comment.associate = function (models) {
    // associations can be defined here
    Comment.belongsTo(models.user) // is enough, because model has userId. You can specify different key
  }
  return Comment
}
