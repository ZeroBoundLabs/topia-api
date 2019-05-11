import Joi from 'joi'
import UserService from '../services/user'

export default [
  {
    method: 'GET',
    path: '/user-project',
    handler: (request, h) => {
      return {
        a: 123
      }
    }
  },

  {
    method: 'GET',
    path: '/user',
    config: { auth: 'jwt' },
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
