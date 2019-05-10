import { init } from '../server.js'
import UserServices from '../services/user'
import models from '../models'

let server
let validUser

beforeAll(async () => {
  server = await init()
  validUser = await UserServices.register('Valid Tester', 'valid@topia.io', 'password')
})

afterAll(async () => {
  await server.stop()
})

describe('POST /user/register', () => {
  test('409 status code when email taken', async () => {
    const takenEmail = 'taken@email.com'
    await UserServices.register('John Tester', takenEmail, 'password')

    const res = await server.inject({
      method: 'post',
      url: '/user/register',
      payload: {
        name: 'Joe Doe',
        email: takenEmail,
        password: 'secretpassword'
      }
    })
    expect(res.statusCode).toBe(409)
  })

  test('400 status code when no params given', async () => {
    const res = await server.inject({
      method: 'post',
      url: '/user/register'
    })
    expect(res.statusCode).toBe(400)
  })

  test('200 status code when user created', async () => {
    const email = 'joe@topia.io'
    const rawPassword = 'secretpassword'
    const res = await server.inject({
      method: 'post',
      url: '/user/register',
      payload: {
        name: 'Joe Doe',
        email: 'joe@topia.io',
        password: rawPassword
      }
    })

    const userDb = await models.User.findOne({ where: { email } })

    expect(res.statusCode).toBe(200)
    expect(res.result.user.email).toBe('joe@topia.io')
    expect(userDb.email).toBe(email)
    expect(userDb.password).not.toBe(rawPassword)
  })
})

describe('POST /user/login', () => {
  test('400 status code when no params given', async () => {
    const res = await server.inject({
      method: 'post',
      url: '/user/login'
    })
    expect(res.statusCode).toBe(400)
  })

  test('404 status code when wrong password', async () => {
    const email = 'tester1@topia.io'
    const password = 'password'
    await UserServices.register('John Tester', email, password)

    const res = await server.inject({
      method: 'post',
      url: '/user/login',
      payload: {
        email: email,
        password: `${password}typo`
      }
    })
    expect(res.statusCode).toBe(404)
  })

  test('404 status code when user not found', async () => {
    const res = await server.inject({
      method: 'post',
      url: '/user/login',
      payload: {
        email: 'notExistingEmail@wtf.com',
        password: 'password'
      }
    })
    expect(res.statusCode).toBe(404)
  })

  test('200 status code when user logged in', async () => {
    const email = 'tester2@topia.io'
    const password = 'password'
    await UserServices.register('John Tester', email, password)
    const res = await server.inject({
      method: 'post',
      url: '/user/login',
      payload: {
        email: email,
        password: password
      }
    })
    expect(res.statusCode).toBe(200)
    expect(res.result.user.email).toBe(email)
  })
})

describe('GET /user', () => {
  test('200 status code when valid JWT given', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/user',
      headers: {
        'Authorization': validUser.token
      }
    })

    const { user } = res.result

    expect(res.statusCode).toBe(200)
    expect(user.name).toBe(validUser.user.name)
    expect(user.id).toBe(validUser.user.id)
  })

  test('401 status code when invalid JWT given', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/user',
      headers: {
        'Authorization': 'You shall not pass'
      }
    })
    expect(res.statusCode).toBe(401)
  })

  test('401 status code when JWT not given', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/user'
    })
    expect(res.statusCode).toBe(401)
  })
})

describe('PUT /user', () => {
  test('changes name when given', async () => {
    const res = await server.inject({
      method: 'put',
      url: '/user',
      headers: {
        'Authorization': validUser.token
      },
      payload: {
        name: 'New name'
      }
    })

    const { result } = res

    expect(res.statusCode).toBe(200)
    expect(result.name).not.toBe(validUser.user.name)
    expect(result.id).toBe(validUser.user.id)
    expect(result.password).toBe(undefined)
  })

  test('changes email when given', async () => {
    const res = await server.inject({
      method: 'put',
      url: '/user',
      headers: {
        'Authorization': validUser.token
      },
      payload: {
        email: 'new@email.com'
      }
    })
    const { result } = res

    expect(res.statusCode).toBe(200)
    expect(result.email).not.toBe(validUser.user.email)
    expect(result.email).toBe('new@email.com')
    expect(result.id).toBe(validUser.user.id)
    expect(result.password).toBe(undefined)
  })

  test('changes password when given', async () => {
    const newPassword = 'newlongpassword'
    const res = await server.inject({
      method: 'put',
      url: '/user',
      headers: {
        'Authorization': validUser.token
      },
      payload: {
        password: newPassword
      }
    })
    const { result } = res

    const loginResponse = await UserServices.login(result.email, newPassword)

    expect(res.statusCode).toBe(200)
    expect(result.id).toBe(validUser.user.id)
    expect(result.password).not.toBe(undefined)
    expect(result.id).toBe(loginResponse.user.id)
  })

  test('401 status code when invalid JWT given', async () => {
    const res = await server.inject({
      method: 'put',
      url: '/user',
      headers: {
        'Authorization': 'You shall not pass'
      }
    })
    expect(res.statusCode).toBe(401)
  })

  test('401 status code when JWT not given', async () => {
    const res = await server.inject({
      method: 'put',
      url: '/user'
    })
    expect(res.statusCode).toBe(401)
  })
})
