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
      const project = await ProjectService.getOne(request.params.id)

      return project
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
      payload: {
        output: 'stream'
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
  },

  {
    method: 'GET',
    path: '/uploads/projects/{file*}',
    handler: {
      directory: {
        path: 'uploads/projects'
      }
    }
  }
]
