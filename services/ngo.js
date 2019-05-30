import models from '../models'
import Boom from 'boom'
import uuid from 'uuidv4'
import { applicationReceived } from './mailgun'

const onboard = async (email, name, orgName) => {
  let user = await models.user.findOne({ where: { email } })
  if (user) {
    throw Boom.conflict('Email taken')
  }

  try {
    const activationToken = uuid()
    user = await models.user.create({
      active: false,
      name,
      email,
      activationToken
    })

    let org = await models.organisation.create({ name: orgName })
    org.addUser(user, { through: { role: 'admin ' } })

    applicationReceived(email, name, orgName)
    return { status: 'ok', data: {} }
  } catch (err) {
    return { status: 'error', data: err }
  }
}

export default {
  onboard
}
