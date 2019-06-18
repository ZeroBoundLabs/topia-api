import models from '../models'
import Boom from 'boom'
import OrganisationService from './organisation'
import userApi from './user'

const findAll = async () => {
  const projects = await models.project.findAll({
    where: { deletedAt: null },
    include: [{ model: models.sdg_target }]
  })

  return projects
}

const findAllByUserId = async id => {
  const user = await userApi.findOne(id)
  const organisations = await user.getOrganisations()
  const projects = []
  for (const org of organisations) {
    let orgProjects = await org.getProjects()
    projects.push(...orgProjects)
  }

  return projects
}

const findOne = async id => {
  const project = await models.project.findOne({
    where: { id, deletedAt: null },
    include: [
      { model: models.sdg_target },
      { model: models.sdg_target, include: [models.sdg] }
    ]
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
    await project.update(payload, {
      fields: ['startAt', 'name', 'description', 'coordinates']
    })
  }

  await models.project_sdg_target.destroy({ where: { project_id: project.id } })

  for (const id of payload.sdgTargetIds) {
    await models.project_sdg_target.create({
      project_id: project.id,
      sdg_target_id: id
    })
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
  findAll,
  findAllByUserId,
  findOne,
  update,
  destroy
}
