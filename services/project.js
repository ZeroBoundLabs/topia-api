import models from '../models'
import Boom from 'boom'
import OrganisationService from './organisation'

const findAll = async () => {
  const projects = await models.project.findAll({
    where: { deletedAt: null }
  })

  return projects
}

const findOne = async (id) => {
  const project = await models.project.findOne({
    where: { id, deletedAt: null }
  })

  if (!project) {
    throw Boom.notFound('Project not found')
  } else {
    return project
  }
}

const update = async (id, payload, userId) => {
  const project = await findOne(id)
  const org = await project.getOrganisation()

  if (await OrganisationService.isMember(org, userId)) {
    await project.update(payload, { fields: ['name'] })
  }

  return project
}

const destroy = async (id, userId) => {
  const project = await findOne(id)
  const org = await project.getOrganisation()

  if (await OrganisationService.isMember(org, userId)) {
    project.deletedAt = new Date()
    await project.save()
  }

  return project
}

export default {
  findAll, findOne, update, destroy
}
