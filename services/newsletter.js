import models from '../models'
import Boom from 'boom'

const addToMailchimp = async email => {
  console.log('implement me')
}

const register = async email => {
  let emailModel = await models.newsletter_email.findOne({ where: { email } })

  if (emailModel) {
    throw Boom.conflict('Email already added')
  } else {
    emailModel = await models.newsletter_email.create({ email })
    await addToMailchimp(email)

    return emailModel
  }
}

export default {
  register
}
