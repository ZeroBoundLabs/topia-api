import TransactionService from '../services/transaction'

export default [
  {
    method: 'POST',
    path: '/transactions',
    handler: async (request, h) => {
      const userId = request.auth.credentials.id
      const { payload } = request
      const model = TransactionService.add({ ...payload, userId })

      return model
    },
    options: {
      auth: 'jwt',
      description: 'Create',
      notes: 'Allows to create new transaction. JWT required.',
      tags: ['api']
    }
  }
]
