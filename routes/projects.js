import Joi from 'joi'
import ProjectService from '../services/project'

export default [
  {
    method: 'GET',
    path: '/projects',
    options: {
      description: 'Get all',
      notes: 'Returns array of projects objects.',
      tags: ['api']
    },
    handler: async (request, h) => {
      const organisations = await ProjectService.findAll()
      return organisations
    }
  },

  {
    method: 'GET',
    path: '/projects/{id}',
    options: {
      description: 'Get by id',
      notes: 'Returns object of specific project.',
      tags: ['api']
    },
    handler: async (request, h) => {
      const organisation = await ProjectService.findOne(request.params.id)

      return organisation
    }
  },

  {
    method: 'PUT',
    path: '/projects/{id}',
    handler: async (request, h) => {
      const userId = request.auth.credentials.id
      const { payload } = request
      const organisation = ProjectService.update(
        request.params.id,
        payload,
        userId
      )

      return organisation
    },
    options: {
      auth: 'jwt',
      description: 'Update',
      notes: 'Allows to update project. JWT required.',
      tags: ['api'],
      validate: {
        payload: {
          name: Joi.string()
            .min(3)
            .max(200)
        }
      }
    }
  },

  {
    method: 'DELETE',
    path: '/projects/{id}',
    options: {
      auth: 'jwt',
      description: 'Delete',
      notes: 'Allows to delete project. JWT required.',
      tags: ['api']
    },
    handler: async (request, h) => {
      const userId = request.auth.credentials.id
      const project = await ProjectService.destroy(request.params.id, userId)

      return project
    }
  }
]
