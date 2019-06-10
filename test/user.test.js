import { init } from '../server.js'
import UserServices from '../services/user'
import models from '../models'
import FormData from 'form-data'
import streamToPromise from 'stream-to-promise'

let server
let validUser

beforeAll(async () => {
  server = await init()
  validUser = await UserServices.register(
    'Valid Tester',
    'valid@topia.io',
    'password'
  )
})

afterAll(async () => {
  await server.stop()
})

describe('PUT /user/password', () => {
  test('400 status code when no params given', async () => {
    const res = await server.inject({
      method: 'put',
      url: '/user/password'
    })
    expect(res.statusCode).toBe(400)
  })

  test('404 status when token not found', async () => {
    const res = await server.inject({
      method: 'put',
      url: '/user/password',
      payload: {
        token: 'SOMETHING IS WRONG HERE',
        password: 'thisismypassword'
      }
    })
    expect(res.statusCode).toBe(404)
  })

  test('sets password if valid token and password given', async () => {
    await UserServices.register('Valid Tester', 'valid1@topia.io', 'password')
    const token = 'someThingRandom1212'
    const password = 'thisismypassword'
    const userDb = await models.user.findOne({
      where: { email: 'valid1@topia.io' }
    })
    await userDb.update({ activationToken: token })

    const res = await server.inject({
      method: 'put',
      url: '/user/password',
      payload: {
        token,
        password
      }
    })
    expect(res.statusCode).toBe(200)

    const loginResponse = await UserServices.login(userDb.email, password)
    expect(loginResponse.user.id).toBe(userDb.id)
  })
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

    const userDb = await models.user.findOne({ where: { email } })

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
        Authorization: validUser.token
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
        Authorization: 'You shall not pass'
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
    const form = new FormData()
    form.append('name', 'New name')
    const payload = await streamToPromise(form)

    const res = await server.inject({
      method: 'put',
      url: '/user',
      headers: {
        Authorization: validUser.token,
        ...form.getHeaders()
      },
      payload
    })

    const { result } = res

    expect(res.statusCode).toBe(200)
    expect(result.name).not.toBe(validUser.user.name)
    expect(result.id).toBe(validUser.user.id)
  })

  test('changes email when given', async () => {
    const form = new FormData()
    form.append('email', 'new@email.com')
    const payload = await streamToPromise(form)

    const res = await server.inject({
      method: 'put',
      url: '/user',
      headers: {
        Authorization: validUser.token,
        ...form.getHeaders()
      },
      payload
    })
    const { result } = res

    expect(res.statusCode).toBe(200)
    expect(result.email).not.toBe(validUser.user.email)
    expect(result.email).toBe('new@email.com')
    expect(result.id).toBe(validUser.user.id)
  })

  test('changes password when given', async () => {
    const newPassword = 'newlongpassword'
    const form = new FormData()
    form.append('password', newPassword)
    form.append('currentPassword', 'password')
    const payload = await streamToPromise(form)

    const res = await server.inject({
      method: 'put',
      url: '/user',
      headers: {
        Authorization: validUser.token,
        ...form.getHeaders()
      },
      payload
    })
    expect(res.statusCode).toBe(200)
    const { result } = res

    const loginResponse = await UserServices.login(result.email, newPassword)

    expect(result.id).toBe(validUser.user.id)
    expect(result.password).not.toBe(undefined)
    expect(result.id).toBe(loginResponse.user.id)
  })

  test('401 status code when invalid JWT given', async () => {
    const res = await server.inject({
      method: 'put',
      url: '/user',
      headers: {
        Authorization: 'You shall not pass'
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
