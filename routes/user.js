import Joi from 'joi'
import UserService from '../services/user'

export default [
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
      const payload = request.payload

      return UserService.login(payload.email, payload.password)
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
      const payload = request.payload
      const user = UserService.register(payload.name, payload.email,
        payload.password)

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
