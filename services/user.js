import models from '../models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Boom from 'boom'
import config from '../config.js'
import { pick } from 'ramda'
import { uploadFile } from './upload'
import { applicationAccepted, applicationRejected } from './mailgun'
import uuid from 'uuidv4'

export const validate = async (decoded, request) => {
  const user = await models.user.findOne({ where: { id: decoded.id } })
  // TO-DO Check if user activated

  if (!user) {
    return { isValid: false }
  } else {
    return { isValid: true }
  }
}

const register = async (name, email, plainPassword, fbId) => {
  let user = await models.user.findOne({ where: { email } })
  if (user) {
    throw Boom.conflict('Email taken')
  }

  const password = await hashPassword(plainPassword)
  user = await models.user.create({ name, email, password, fbId })

  return userResponse(user)
}

const hashPassword = async plainPassword => {
  const saltRounds = 12
  const hash = await bcrypt.hash(plainPassword, saltRounds)

  return hash
}

const login = async (email, plainPassword) => {
  const user = await models.user.findOne({ where: { email } })
  if (!user || user.deletedAt !== null) {
    throw Boom.notFound('User not found')
  }

  const valid = await bcrypt.compare(plainPassword, user.password)
  if (!valid) {
    throw Boom.notFound('Wrong password')
  }

  return userResponse(user)
}

export const userResponse = user => {
  const { id, email, name, role, avatarFilename, bannerFilename } = user

  return {
    token: generateJWT(user),
    user: { id, email, name, role, avatarFilename, bannerFilename }
  }
}

const generateJWT = ({ id, name, role }) =>
  jwt.sign({ id, name, scope: role }, config.jwtSecret, { expiresIn: '30d' })

const findAll = async () => {
  const users = await models.user.findAll({
    attributes: { exclude: ['password'] }
  })

  return users
}

const findOne = async id => {
  const user = await models.user.findOne({
    where: { id },
    attributes: { exclude: ['password'] }
  })

  if (!user || user.deletedAt !== null) {
    throw Boom.notFound('User not found')
  }

  return user
}

const getUser = async id => {
  const user = await findOne(id)

  return userResponse(user)
}

const activate = async id => {
  const user = await findOne(id)
  const activationToken = uuid()
  user.active = true
  user.activationToken = activationToken
  await user.save()
  const organisations = await user.getOrganisations({ limit: 1 })

  if (organisations[0]) {
    const activationUrl = `${config.webAppUrl}/app/activate/${
      user.activationToken
    }`
    applicationAccepted(
      user.email,
      user.name,
      organisations[0].name,
      activationUrl
    )
  }

  return fullUserResponse(user)
}

const deactivate = async id => {
  const user = await findOne(id)
  user.active = false
  user.activationToken = null
  await user.save()

  const organisations = await user.getOrganisations({ limit: 1 })

  if (organisations[0]) {
    applicationRejected(user.email, user.name, organisations[0].name)
  }

  return fullUserResponse(user)
}

const destroy = async id => {
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
  bannerFilename: user.bannerFilename,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
  deletedAt: user.deletedAt
})

const setPassword = async (activationToken, password) => {
  const user = await models.user.findOne({
    where: { activationToken },
    attributes: { exclude: ['password'] }
  })

  if (!user) {
    throw Boom.notFound('User not found')
  } else {
    const hashedPassword = await hashPassword(password)

    await user.update({
      password: hashedPassword,
      activationToken: null
    })

    return userResponse(user)
  }
}

const fileUpload = async (file, id, type) => {
  const data = file._data
  const sanitizedFilename = `${type}_${id}_${file.hapi.filename}`
    .replace(/[^a-z0-9]/gi, '_')
    .toLowerCase()
  await uploadFile(sanitizedFilename, data, `user_${type}`)

  return sanitizedFilename
}

const setNewPassword = async (user, payload) => {
  const { password: newPassword, currentPassword } = payload

  const valid = await bcrypt.compare(currentPassword, user.password)

  if (!valid) {
    throw Boom.conflict('Current password do not match')
  } else {
    const newPassHash = await hashPassword(newPassword)
    return newPassHash
  }
}

const update = async (id, payload) => {
  const user = await models.user.findOne({ where: { id } })
  const params = pick(['name', 'email', 'password'], payload)
  if (params.password && payload.currentPassword) {
    params.password = await setNewPassword(user, payload)
  }
  if (payload.avatarFile) {
    params.avatarFilename = await fileUpload(payload.avatarFile, id, 'avatar')
  }

  if (payload.bannerFile) {
    params.bannerFilename = await fileUpload(payload.bannerFile, id, 'banner')
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
  destroy,
  setPassword,
  userResponse
}
