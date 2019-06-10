import UserService from '../../services/user'
import Joi from 'joi'

const auth = {
  strategy: 'jwt',
  access: [
    {
      scope: ['admin']
    }
  ]
}

export default [
  {
    method: 'GET',
    path: '/admin/users',
    options: {
      auth,
      description: 'Get all users',
      notes:
        'Returns all users existing in system. JWT token must be provided in the header and caller must be an admin.',
      tags: ['api']
    },
    handler: async (request, h) => {
      const users = await UserService.findAll()
      return { users }
    }
  },
  {
    method: 'GET',
    path: '/admin/user/{id}',
    options: {
      auth,
      description: 'Get user',
      notes:
        'Returns specific user existing in system. JWT token must be provided in the header and caller must be an admin.',
      tags: ['api']
    },
    handler: async (request, h) => {
      const user = await UserService.findOne(request.params.id)
      return { user }
    }
  },
  {
    method: 'PUT',
    path: '/admin/user/{id}/activate',
    options: {
      auth,
      description: 'Activate user',
      notes:
        'Activate user. JWT token must be provided in the header and caller must be an admin.',
      tags: ['api']
    },
    handler: async (request, h) => {
      const user = await UserService.activate(request.params.id)
      return { user }
    }
  },
  {
    method: 'PUT',
    path: '/admin/user/{id}/deactivate',
    options: {
      auth,
      description: 'Deactivate user',
      notes:
        'Deactivate user. JWT token must be provided in the header and caller must be an admin.',
      tags: ['api']
    },
    handler: async (request, h) => {
      const user = await UserService.deactivate(request.params.id)
      return { user }
    }
  },
  {
    method: 'PUT',
    path: '/admin/user/{id}',
    options: {
      auth,
      description: 'Update user',
      notes:
        'Updates user data. JWT token must be provided in the header and caller must be an admin.',
      tags: ['api'],
      validate: {
        payload: {
          name: Joi.string()
            .min(3)
            .max(200),
          email: Joi.string().email(),
          role: Joi.string()
            .min(3)
            .max(200)
        }
      }
    },
    handler: async (request, h) => {
      const { payload } = request

      let user = await UserService.update(request.params.id, payload)
      if (payload.role) {
        user = await UserService.assignRole(request.params.id, payload.role)
      }

      return { user }
    }
  },

  {
    method: 'DELETE',
    path: '/admin/user/{id}',
    options: {
      auth,
      description: 'Delete user',
      notes:
        'Deletes user (soft delete). JWT token must be provided in the header and caller must be an admin.',
      tags: ['api']
    },
    handler: async (request, h) => {
      const user = await UserService.destroy(request.params.id)

      return { user }
    }
  }
]
