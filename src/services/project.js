import models from '../models'
import Boom from 'boom'

const getProjects = async (name, email, plainPassword) => {
  let user = await models.User.findOne({ where: { email } })
  if (user) {
    throw Boom.conflict('Email taken')
  }

  const password = await hashPassword(plainPassword)
  user = await models.User.create({ name, email, password })

  return userResponse(user)
}
