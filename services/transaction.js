import models from '../models'
import config from '../config.js'
import Boom from 'boom'
import Stripe from 'stripe'

const add = async ({
  organizationId,
  userId,
  projectId,
  amount,
  currency,
  stripeToken
}) => {
  try {
    const stripe = Stripe(config.stripeSecret)
    const response = await stripe.charges.create({
      source: stripeToken,
      amount: amount * 100,
      currency
    })
    const model = await models.transaction.create({
      type: 'stripe',
      block_address: response.id,
      donor_id: userId,
      project_id: projectId === 0 ? null : projectId,
      organisation_id: organizationId,
      amount: amount * 100,
      currency,
      status: response.status
    })

    return model
  } catch (e) {
    console.log(e)
    Boom.conflict(e)
  }
}

export default {
  add
}
