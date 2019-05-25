'use strict'
module.exports = (sequelize, DataTypes) => {
  const NewsletterEmail = sequelize.define('newsletter_email', {
    email: DataTypes.STRING
  }, {})
  NewsletterEmail.associate = function (models) {
    // associations can be defined here
  }
  return NewsletterEmail
}
