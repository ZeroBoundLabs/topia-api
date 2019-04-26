import models from '../models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Boom from 'boom'
import config from '../config.js'

export const validate = async (decoded, request) => {
  const user = await models.User.findOne({ where: { id: decoded.id } })
  // TO-DO Check if user activated

  if (!user) {
    return { isValid: false }
  } else {
    return { isValid: true }
  }
}

const register = async (name, email, plainPassword) => {
  let user = await models.User.findOne({ where: { email } })
  if (user) { throw Boom.conflict('Email taken') }

  const password = await hashPassword(plainPassword)
  user = await models.User.create({ name, email, password })

  return userResponse(user)
}

const hashPassword = async plainPassword => {
  const saltRounds = 12
  const hash = await bcrypt.hash(plainPassword, saltRounds)

  return hash
}

const login = async (email, plainPassword) => {
  const user = await models.User.findOne({ where: { email } })
  if (!user) { throw Boom.notFound('User not found') }

  const valid = await bcrypt.compare(plainPassword, user.password)
  if (!valid) { throw Boom.notFound('Wrong password') }

  return userResponse(user)
}

const userResponse = user => {
  const { id, email } = user

  return {
    token: generateJWT(user),
    user: { id, email }
  }
}

const generateJWT = ({ id, name }) =>
  jwt.sign({ id, name }, config.jwtSecret, { expiresIn: '30d' })

export default {
  register, login, validate, generateJWT, hashPassword
}
