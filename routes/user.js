import Joi from 'joi'
import UserService from '../services/user'

export default [
  {
    method: 'GET',
    path: '/user',
    options: {
      auth: 'jwt',
      description: 'Get user',
      notes: 'Returns user object. JWT token must be provided in the header.',
      tags: ['api']
    },
    handler: async (request, h) => {
      const { id } = request.auth.credentials
      const user = await UserService.getUser(id)

      return user
    }
  },

  {
    method: 'PUT',
    path: '/user',
    options: {
      auth: 'jwt',
      description: 'Update user',
      notes: 'Allows to update personal data of user. JWT token must be provided in the header.',
      tags: ['api'],
      validate: {
        payload: {
          name: Joi.string().min(3).max(200),
          email: Joi.string().email(),
          password: Joi.string().min(3).max(200),
          avatarFile: Joi.any()
        }
      },
      payload: {
        output: 'stream'
      }
    },
    handler: async (request, h) => {
      const { id } = request.auth.credentials
      const user = await UserService.update(id, request.payload)

      return user
    }
  },

  {
    method: 'POST',
    path: '/user/login',
    handler: async (request, h) => {
      const { email, password } = request.payload
      const user = await UserService.login(email, password)
      return user
    },
    options: {
      auth: false,
      description: 'Login',
      notes: 'Allows to login user. In exchange you will receive JWT.',
      tags: ['api'],
      validate: {
        payload: {
          email: Joi.string().email().required(),
          password: Joi.string().min(3).max(200).required()
        }
      }
    }
  },

  {
    method: 'POST',
    path: '/user/register',
    handler: async (request, h) => {
      const { name, email, password } = request.payload
      const user = await UserService.register(name, email, password)

      return user
    },
    options: {
      auth: false,
      description: 'Register',
      notes: 'Allows to register new user.',
      tags: ['api'],
      validate: {
        payload: {
          name: Joi.string().min(3).max(200).required(),
          email: Joi.string().email().required(),
          password: Joi.string().min(3).max(200).required()
        }
      }
    }
  },

  {
    method: 'GET',
    path: '/uploads/users/{file*}',
    handler: {
      directory: {
        path: 'uploads/users'
      }
    }
  }
]
