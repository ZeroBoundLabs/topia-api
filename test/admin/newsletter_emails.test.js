import { init } from '../../server'
import UserServices from '../../services/user'
import NewsletterServices from '../../services/newsletter'
import faker from 'faker'

let server
let regular, admin

beforeAll(async () => {
  server = await init()
  regular = await UserServices.register(
    'Joe Tester',
    faker.internet.email(),
    'password'
  )
  admin = await UserServices.register(
    'Admin Tester',
    faker.internet.email(),
    'password'
  )
  await UserServices.assignRole(admin.user.id, 'admin')
  admin = await UserServices.login(admin.user.email, 'password')
})

afterAll(async () => {
  await server.stop()
})

describe('GET /admin/newsletter_emails', () => {
  test('401 status code when not JWT given', async () => {
    const res = await server.inject({
      method: 'get',
      url: `/admin/newsletter_emails`
    })
    expect(res.statusCode).toBe(401)
  })

  test('401 status code when wrong JWT given', async () => {
    const res = await server.inject({
      method: 'get',
      url: `/admin/newsletter_emails`,
      headers: {
        Authorization: 'You shall not pass'
      }
    })

    expect(res.statusCode).toBe(401)
  })

  test('403 status code when not admin JWT given', async () => {
    const res = await server.inject({
      method: 'get',
      url: `/admin/newsletter_emails`,
      headers: {
        Authorization: regular.token
      }
    })

    expect(res.statusCode).toBe(403)
  })

  test('returns list of mails', async () => {
    const subscriber = 'subscriber@topia.us'
    await NewsletterServices.register(subscriber)

    const res = await server.inject({
      method: 'get',
      url: `/admin/newsletter_emails`,
      headers: {
        Authorization: admin.token
      }
    })

    expect(res.statusCode).toBe(200)
    expect(res.result.length).toBeGreaterThan(0)
  })
})
