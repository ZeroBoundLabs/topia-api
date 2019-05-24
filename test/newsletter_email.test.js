import { init } from '../server.js'
import NewsletterServices from '../services/newsletter'

let server
let takenEmail

beforeAll(async () => {
  server = await init()
  takenEmail = await NewsletterServices.register('taken@email.com')
})

afterAll(async () => {
  await server.stop()
})

describe('POST /newsletter', () => {
  test('409 status code when email taken', async () => {
    const res = await server.inject({
      method: 'post',
      url: '/newsletter',
      payload: {
        email: takenEmail.email
      }
    })
    expect(res.statusCode).toBe(409)
  })

  test('400 status code when no params given', async () => {
    const res = await server.inject({
      method: 'post',
      url: '/newsletter'
    })
    expect(res.statusCode).toBe(400)
  })

  test('200 status code when email created', async () => {
    const email = 'joe@topia.io'
    const res = await server.inject({
      method: 'post',
      url: '/newsletter',
      payload: { email }
    })

    expect(res.statusCode).toBe(200)
    expect(res.result.email).toBe('joe@topia.io')
  })
})
