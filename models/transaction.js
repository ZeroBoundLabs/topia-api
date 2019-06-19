'use strict'
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    'transaction',
    {
      amount: DataTypes.INTEGER,
      status: DataTypes.STRING,
      type: DataTypes.STRING,
      currency: DataTypes.STRING,
      project_id: DataTypes.INTEGER,
      donor_id: DataTypes.INTEGER,
      organisation_id: DataTypes.INTEGER,
      block_address: DataTypes.STRING,
      milestone_id: DataTypes.INTEGER
    },
    {}
  )
  Transaction.associate = function (models) {
    // associations can be defined here
    Transaction.belongsTo(models.project, {
      foreignKey: 'project_id'
    })
    Transaction.belongsTo(models.user, {
      foreignKey: 'donor_id'
    })
    Transaction.belongsTo(models.organisation, {
      foreignKey: 'organisation_id'
    })
  }
  return Transaction
}
