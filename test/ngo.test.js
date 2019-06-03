import { init } from '../server.js'
import models from '../models'
import mockMailgun from '../services/mailgun'
jest.mock('../services/mailgun')

let server

beforeAll(async () => {
  server = await init()
})

afterAll(async () => {
  await server.stop()
})

describe('POST /ngo', () => {
  test('400 status code when no all params given', async () => {
    const res = await server.inject({
      method: 'post',
      url: '/ngo',
      payload: {
        name: 'Tom Cruise'
      }
    })
    expect(res.statusCode).toBe(400)
    expect(mockMailgun.applicationReceived).toHaveBeenCalledTimes(0)
  })

  test('200 status code when user created', async () => {
    const email = 'chmarus@gmail.com'
    const orgName = 'Maasarang Tests'

    const res = await server.inject({
      method: 'post',
      url: '/ngo',
      payload: {
        name: 'Joe Doe',
        email,
        orgName
      }
    })

    const userDb = await models.user.findOne({ where: { email } })
    const orgDb = await models.organisation.findOne({
      where: { name: orgName }
    })

    expect(res.statusCode).toBe(200)
    expect(userDb.email).toBe(email)
    expect(userDb.active).toBe(false)
    expect(orgDb.name).toBe(orgName)
  })
})
