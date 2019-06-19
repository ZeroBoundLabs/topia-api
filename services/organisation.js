import models from '../models'
import { pick } from 'ramda'
import { uploadFile } from './upload'
import Boom from 'boom'
import userApi from './user'
import config from '../config.js'

const findAll = async () => {
  const organisations = await models.organisation.findAll({
    where: { deletedAt: null }
  })

  return organisations.map(org => organisationResponse(org))
}

const findAllByUserId = async id => {
  const user = await userApi.findOne(id)

  const organisations = await user.getOrganisations()

  return organisations.map(org => organisationResponse(org))
}

const updateLogo = async (model, file) => {
  const data = file._data
  const sanitizedFilename = `logo-${model.id}-${file.hapi.filename}`
    .replace(/[^a-z0-9]/gi, '_')
    .toLowerCase()

  await uploadFile(sanitizedFilename, data, 'organisation_logo')
  const updated = await model.update(
    { logo: sanitizedFilename },
    { fields: ['logo'] }
  )

  return updated
}

const updateBanner = async (model, file) => {
  const data = file._data
  const sanitizedFilename = `banner-${model.id}-${file.hapi.filename}`
    .replace(/[^a-z0-9]/gi, '_')
    .toLowerCase()

  await uploadFile(sanitizedFilename, data, 'organisation_banner')
  const updated = await model.update(
    { bannerFilename: sanitizedFilename },
    { fields: ['bannerFilename'] }
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
    const params = pick(
      ['name', 'email', 'logo', 'type', 'description'],
      payload
    )
    let org = await organisation.update(params)

    if (payload.logoFile) {
      org = await updateLogo(org, payload.logoFile)
    }

    if (payload.bannerFile) {
      org = await updateBanner(org, payload.bannerFile)
    }

    return organisationResponse(org)
  } else {
    throw Boom.unauthorized('Insufficient permissions')
  }
}

const findOne = async id => {
  const organisation = await models.organisation.findOne({
    include: [
      { model: models.project },
      { model: models.transaction, include: { model: models.user } }
    ],
    where: { id, deletedAt: null }
  })

  if (!organisation) {
    throw Boom.notFound('Organisation not found')
  } else {
    return organisation
  }
}

const getOne = async id => {
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
    const relation = await models.organisation_user.findOne({
      where: { organisation_id: id, user_id: payload.userId }
    })
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
    const project = await org.createProject({
      name: payload.name,
      startAt: payload.startAt,
      coordinates: payload.coordinates
    })

    for (const id of payload.sdgTargetIds) {
      await models.project_sdg_target.create({
        project_id: project.id,
        sdg_target_id: id
      })
    }

    return project
  } else {
    throw Boom.unauthorized('Unsufficient permissions')
  }
}

const getAllProjects = async id => {
  const org = await findOne(id)
  const projects = await org.getProjects()

  return projects
}

const organisationResponse = organisation => ({
  id: organisation.id,
  name: organisation.name,
  email: organisation.email,
  logoUrl: organisation.logo
    ? `${config.webAppUrl}/uploads/organisations/${organisation.logo}`
    : null,
  bannerUrl: organisation.logo
    ? `${config.webAppUrl}/uploads/organisations/${organisation.bannerFilename}`
    : null,
  type: organisation.type,
  description: organisation.description,
  createdAt: organisation.createdAt,
  updatedAt: organisation.updatedAt,
  deletedAt: organisation.deletedAt,
  projects: organisation.projects,
  transactions: organisation.transactions
})

export default {
  findAll,
  create,
  destroy,
  getOne,
  update,
  addUser,
  removeUser,
  addProject,
  getAllProjects,
  findAllByUserId,
  isMember
}
