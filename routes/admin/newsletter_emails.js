import NewsletterService from '../../services/newsletter.js'

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
    path: '/admin/newsletter_emails',
    options: {
      auth,
      description: 'Get all emails',
      notes:
        'Returns all emails of people that signed up for newsletter. JWT token must be provided in the header and caller must be an admin.',
      tags: ['api']
    },
    handler: async (request, h) => {
      const emails = await NewsletterService.findAll()
      return emails
    }
  }
]
