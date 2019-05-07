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
    handler: (request, h) => {
      return request.auth.credentials
    }
  },

  {
    method: 'POST',
    path: '/user/login',
    handler: (request, h) => {
      const { email, password } = request.payload

      return UserService.login(email, password)
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
    handler: (request, h) => {
      const { name, email, password } = request.payload
      const user = UserService.register(name, email, password)

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
  }
]
