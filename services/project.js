import models from '../models'
import Boom from 'boom'
import OrganisationService from './organisation'
import userApi from './user'
import { uploadFile } from './upload'
import config from '../config.js'

const updateBanner = async (model, file) => {
  const data = file._data
  const sanitizedFilename = `banner-${model.id}-${file.hapi.filename}`
    .replace(/[^a-z0-9.]/gi, '_')
    .toLowerCase()

  await uploadFile(sanitizedFilename, data, 'project_banner')
  const updated = await model.update(
    { bannerFilename: sanitizedFilename },
    { fields: ['bannerFilename'] }
  )

  return updated
}

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

const getOne = async id => {
  const project = await findOne(id)

  return projectResponse(project)
}

const projectResponse = project => {
  return {
    id: project.id,
    coordinates: project.coordinates,
    sdg_targets: project.sdg_targets,
    startAt: project.startAt,
    name: project.name,
    sattelite_url: project.sattelite_url,
    description: project.description,
    bannerUrl: project.bannerFilename
      ? `${config.apiUrl}/uploads/projects/${project.bannerFilename}`
      : null
  }
}

const update = async (id, payload, userId) => {
  let project = await findOne(id)
  const params = {
    ...payload,
    coordinates: JSON.parse(payload.coordinates),
    sdgTargetIds: JSON.parse(payload.sdgTargetIds)
  }
  const org = await project.getOrganisation()

  if (await OrganisationService.isMember(org, userId)) {
    await project.update(params, {
      fields: ['startAt', 'name', 'description', 'coordinates']
    })
  }

  if (payload.bannerFile) {
    project = await updateBanner(project, payload.bannerFile)
  }

  await models.project_sdg_target.destroy({ where: { project_id: project.id } })

  for (const id of params.sdgTargetIds) {
    await models.project_sdg_target.create({
      project_id: project.id,
      sdg_target_id: id
    })
  }

  return projectResponse(project)
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
  getOne,
  update,
  destroy
}
