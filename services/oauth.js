import models from '../models'
import Boom from 'boom'
import axios from 'axios'
import userApi from './user'
import config from '../config.js'

export const facebookLogin = async ({ fbId, name, email, accessToken }) => {
  const clientId = config.fbClientId
  const clientSecret = config.fbSecret
  const appToken = await axios.get(
    `https://graph.facebook.com/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`
  )
  const userToken = await axios(
    `https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${
      appToken.data.access_token
    }`
  )

  if (userToken.data.data.is_valid) {
    if (userToken.data.data.user_id === fbId) {
      let user = await models.user.findOne({ where: { fbId } })
      if (user) {
        return userApi.userResponse(user)
      } else {
        const response = await userApi.register(name, email, accessToken, fbId)
        return response
      }
    } else {
      throw Boom.unauthorized('Something went wrong')
    }
  } else {
    throw Boom.unauthorized('Something went wrong')
  }
}
