import models from '../models'
import Boom from 'boom'
import { addEmailToContacts } from './mailchimp.js'

const register = async email => {
  let emailModel = await models.newsletter_email.findOne({ where: { email } })

  if (emailModel) {
    throw Boom.conflict('Email already added')
  } else {
    emailModel = await models.newsletter_email.create({ email })
    await addEmailToContacts(email)

    return emailModel
  }
}

const findAll = async () => {
  const emails = await models.newsletter_email.findAll()

  return emails
}

export default {
  register,
  findAll
}
