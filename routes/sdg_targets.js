import models from '../models'

export default [
  {
    method: 'GET',
    path: '/sdg_targets',
    options: {
      description: 'Get all sdg targets',
      notes: 'Returns array of sdg target objects.',
      tags: ['api']
    },
    handler: async (request, h) => {
      const sdgTargets = await models.sdg_target.findAll({
        include: [{ model: models.sdg }]
      })
      return sdgTargets
    }
  }
]
