import Joi from 'joi'
import { facebookLogin } from '../services/oauth'

export default [
  {
    method: 'POST',
    path: '/oauth/facebook',
    options: {
      description: 'Login with facebook credentials',
      notes: 'Returns user entity.',
      tags: ['api'],
      validate: {
        payload: {
          fbId: Joi.string(),
          name: Joi.string().required(),
          email: Joi.string().required(),
          accessToken: Joi.string().required()
        }
      }
    },
    handler: async (request, h) => {
      const user = await facebookLogin({ ...request.payload })
      return user
    }
  }
]
