import axios from 'axios'
import config from '../config.js'

export const addEmailToContacts = async email => {
  try {
    const apiUrl = `https://us20.api.mailchimp.com/3.0/lists/${
      config.mailchimpNewsletterListId
    }/members/`
    const data = { email_address: email, status: 'pending' }
    const params = {
      auth: { username: config.mailchimpUser, password: config.mailchimpApiKey }
    }

    await axios.post(apiUrl, data, params)
  } catch (err) {
    console.log(err)
  }
}
