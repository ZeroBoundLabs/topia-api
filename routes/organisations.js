import Joi from 'joi'
import OrganisationService from '../services/organisation'

export default [
  {
    method: 'GET',
    path: '/organisations',
    options: {
      description: 'Get all',
      notes: 'Returns array of organisation objects.',
      tags: ['api']
    },
    handler: async (request, h) => {
      const organisations = await OrganisationService.findAll()
      return organisations
    }
  },

  {
    method: 'GET',
    path: '/organisations/{id}',
    options: {
      description: 'Get by id',
      notes: 'Returns object of specific organisation.',
      tags: ['api']
    },
    handler: async (request, h) => {
      const organisation = await OrganisationService.getOne(request.params.id)

      return organisation
    }
  },

  {
    method: 'POST',
    path: '/organisations',
    options: {
      auth: 'jwt',
      description: 'Create',
      notes: 'Allows to create new organisation. JWT required.',
      tags: ['api'],
      validate: {
        payload: {
          name: Joi.string().min(3).max(200),
          email: Joi.string().email(),
          logo: Joi.string().min(3).max(200),
          type: Joi.string().min(3).max(200),
          description: Joi.string().min(3).max(2000),
          logoFile: Joi.any()
        }
      },
      payload: {
        output: 'stream'
      }
    },
    handler: async (request, h) => {
      const creatorId = request.auth.credentials.id
      const { payload } = request
      const organisation = OrganisationService.create(creatorId, payload)

      return organisation
    }
  },

  {
    method: 'PUT',
    path: '/organisations/{id}',
    handler: async (request, h) => {
      const userId = request.auth.credentials.id
      const { payload } = request
      const organisation = OrganisationService
        .create(request.params.id, payload, userId)

      return organisation
    },
    options: {
      auth: 'jwt',
      description: 'Update',
      notes: 'Allows to update organisation. JWT required.',
      tags: ['api'],
      validate: {
        payload: {
          name: Joi.string().min(3).max(200),
          email: Joi.string().email(),
          logo: Joi.string().min(3).max(200),
          type: Joi.string().min(3).max(200),
          description: Joi.string().min(3).max(2000),
          logoFile: Joi.any()
        }
      }
    }
  },

  {
    method: 'DELETE',
    path: '/organisations/{id}',
    options: {
      auth: 'jwt',
      description: 'Delete',
      notes: 'Allows to delete organisation. JWT required.',
      tags: ['api']
    },
    handler: async (request, h) => {
      const userId = request.auth.credentials.id
      const organisation = await OrganisationService.destroy(request.params.id, userId)

      return organisation
    }
  },

  {
    method: 'POST',
    path: '/organisations/{id}/users',
    options: {
      auth: 'jwt',
      description: 'Add user',
      notes: 'Add new user to organisation. JWT required.',
      tags: ['api'],
      validate: {
        payload: {
          userId: Joi.number().integer().required(),
          role: Joi.string().required()
        }
      }
    },
    handler: async (request, h) => {
      const callerId = request.auth.credentials.id
      const organisation = await OrganisationService
        .addUser(request.params.id, callerId, request.payload)

      return organisation
    }
  },

  {
    method: 'DELETE',
    path: '/organisations/{id}/users',
    options: {
      auth: 'jwt',
      description: 'Remove user',
      notes: 'Removes user from organisation. JWT required.',
      tags: ['api'],
      validate: {
        payload: {
          userId: Joi.number().integer().required()
        }
      }
    },
    handler: async (request, h) => {
      const callerId = request.auth.credentials.id
      const organisation = await OrganisationService
        .removeUser(request.params.id, callerId, request.payload)

      return organisation
    }
  }
]
