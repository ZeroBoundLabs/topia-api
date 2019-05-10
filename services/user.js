import models from '../models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Boom from 'boom'
import config from '../config.js'
import { pick } from 'ramda'
import { uploadFile } from './upload'

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
  if (!user || user.deletedAt !== null) { throw Boom.notFound('User not found') }

  const valid = await bcrypt.compare(plainPassword, user.password)
  if (!valid) { throw Boom.notFound('Wrong password') }

  return userResponse(user)
}

const userResponse = user => {
  const { id, email, name, role } = user

  return {
    token: generateJWT(user),
    user: { id, email, name, role }
  }
}

const generateJWT = ({ id, name, role }) =>
  jwt.sign({ id, name, scope: role }, config.jwtSecret, { expiresIn: '30d' })

const findAll = async () => {
  const users = await models.User.findAll({ attributes: { exclude: ['password'] } })

  return users
}

const findOne = async (id) => {
  const user = await models.User.findOne({
    where: { id },
    attributes: { exclude: ['password'] }
  })

  if (!user || user.deletedAt !== null) { throw Boom.notFound('User not found') }

  return user
}

const getUser = async (id) => {
  const user = await findOne(id)

  return userResponse(user)
}

const activate = async (id) => {
  const user = await findOne(id)
  user.active = true
  await user.save()

  return fullUserResponse(user)
}

const deactivate = async (id) => {
  const user = await findOne(id)
  user.active = false
  await user.save()

  return fullUserResponse(user)
}

const destroy = async (id) => {
  const user = await findOne(id)
  user.deletedAt = new Date()
  await user.save()

  return fullUserResponse(user)
}

const fullUserResponse = user => ({
  id: user.id,
  name: user.name,
  email: user.email,
  active: user.active,
  role: user.role,
  password: user.password,
  avatarFilename: user.avatarFilename,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
  deletedAt: user.deletedAt
})

const update = async (id, payload) => {
  const user = await findOne(id)
  const params = pick(['name', 'email', 'password'], payload)
  if (params.password) {
    params.password = await hashPassword(params.password)
  }

  if (payload.avatarFile) {
    const file = payload.avatarFile
    const data = file._data
    const sanitizedFilename = `avatar-${id}-${file.hapi.filename}`

    await uploadFile(sanitizedFilename, data, 'user_avatar')
    params.avatarFilename = sanitizedFilename
  }

  await user.update(params)

  return fullUserResponse(user)
}

const assignRole = async (id, role) => {
  const user = await findOne(id)
  await user.update({ role })

  return fullUserResponse(user)
}

export default {
  register,
  login,
  validate,
  generateJWT,
  hashPassword,
  findAll,
  findOne,
  activate,
  deactivate,
  update,
  getUser,
  assignRole,
  destroy
}
