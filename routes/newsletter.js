import Joi from 'joi'
import NewsletterServices from '../services/newsletter'

export default [
  {
    method: 'POST',
    path: '/newsletter',
    handler: async (request, h) => {
      const email = await NewsletterServices.register(request.payload.email)
      return email
    },
    options: {
      description: 'Add',
      notes: 'Add new email to newsletter',
      tags: ['api'],
      validate: {
        payload: {
          email: Joi.string()
            .email()
            .required()
        }
      }
    }
  }
]
