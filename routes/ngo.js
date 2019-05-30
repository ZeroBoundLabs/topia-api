import Joi from 'joi'
import NGO from '../services/ngo'

export default [
  {
    method: 'POST',
    path: '/ngo',
    handler: async (request, h) => {
      const { email, name, orgName } = request.payload
      const result = await NGO.onboard(email, name, orgName)
      return result
    },
    options: {
      auth: false,
      description: 'Onboards NGO',
      notes: 'Allows to create non-active user and ngo.',
      tags: ['api'],
      validate: {
        payload: {
          email: Joi.string()
            .email()
            .required(),
          name: Joi.string()
            .min(1)
            .max(200)
            .required(),
          orgName: Joi.string()
            .min(1)
            .max(200)
            .required()
        }
      }
    }
  }
]
