import models from '../models'
import { pick } from 'ramda'
import { uploadFile } from './upload'
import Boom from 'boom'

const findAll = async () => {
  const organisations = await models.organisation.findAll({
    where: { deletedAt: null }
  })

  return organisations.map(org => organisationResponse(org))
}

const updateLogo = async (model, file) => {
  const data = file._data
  const sanitizedFilename = `logo-${model.id}-${file.hapi.filename}`

  await uploadFile(sanitizedFilename, data, 'organisation_logo')
  const updated = await model.update(
    { logo: sanitizedFilename }, { fields: ['logo'] }
  )

  return updated
}

const create = async (creatorId, payload) => {
  const params = pick(['name', 'email', 'logo', 'type', 'description'], payload)
  let org = await models.organisation.create({ ...params })
  const creator = await models.user.findOne({ where: { id: creatorId } })
  org.addUser(creator, { through: { role: 'admin ' } })

  if (payload.logoFile) {
    org = await updateLogo(org, payload.logoFile)
  }

  return organisationResponse(org)
}

const update = async (id, payload, userId) => {
  const organisation = await findOne(id)

  if (await isMember(organisation, userId)) {
    const params = pick(['name', 'email', 'logo', 'type', 'description'], payload)
    let org = await organisation.update(params)

    if (payload.logoFile) {
      org = await updateLogo(org, payload.logoFile)
    }

    return organisationResponse(org)
  } else {
    throw Boom.unauthorized('Insufficient permissions')
  }
}

const findOne = async (id) => {
  const organisation = await models.organisation.findOne({
    where: { id, deletedAt: null }
  })

  if (!organisation) { throw Boom.notFound('Organisation not found') }

  return organisation
}

const getOne = async (id) => {
  const org = await findOne(id)

  return organisationResponse(org)
}

const isMember = async (organisation, userId) => {
  const users = await organisation.getUsers({ where: { id: userId } })
  return users.length > 0
}

const destroy = async (id, userId) => {
  const organisation = await findOne(id)

  if (await isMember(organisation, userId)) {
    organisation.deletedAt = new Date()
    await organisation.save()
  } else {
    throw Boom.unauthorized('Unsufficient permissions')
  }

  return organisation
}

const addUser = async (id, callerId, payload) => {
  const org = await findOne(id)

  if (await isMember(org, callerId)) {
    const user = await models.user.findOne({ where: { id: payload.userId } })
    org.addUser(user, { through: { role: payload.role } })
  } else {
    throw Boom.unauthorized('Unsufficient permissions')
  }

  return org
}

const removeUser = async (id, callerId, payload) => {
  const org = await findOne(id)

  if (await isMember(org, callerId)) {
    const relation = await models.organisation_user
      .findOne({ where: { organisation_id: id, user_id: payload.userId } })
    if (relation) {
      await relation.destroy({ force: true })
    } else {
      throw Boom.notFound('No such user')
    }
  } else {
    throw Boom.unauthorized('Unsufficient permissions')
  }

  return org
}

const addProject = async (id, callerId, payload) => {
  const org = await findOne(id)

  if (await isMember(org, callerId)) {
    const project = await org.createProject({ name: payload.name })

    return project
  } else {
    throw Boom.unauthorized('Unsufficient permissions')
  }
}

const organisationResponse = organisation => ({
  id: organisation.id,
  name: organisation.name,
  email: organisation.email,
  logo: organisation.logo,
  type: organisation.type,
  description: organisation.description,
  createdAt: organisation.createdAt,
  updatedAt: organisation.updatedAt,
  deletedAt: organisation.deletedAt
})

export default {
  findAll, create, destroy, getOne, update, addUser, removeUser, addProject
}
