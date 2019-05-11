import { init } from '../../server'
import UserServices from '../../services/user'

let server
let regular, admin

beforeAll(async () => {
  server = await init()
  regular = await UserServices.register('Joe Tester', 'joe1@topia.io', 'password')
  admin = await UserServices.register('Admin Tester', 'rootadmin@topia.io', 'password')
  await UserServices.assignRole(admin.user.id, 'admin')
  admin = await UserServices.login('rootadmin@topia.io', 'password')
})

afterAll(async () => {
  await server.stop()
})

describe('DELETE /admin/user/{id}', () => {
  test('401 status code when not JWT given', async () => {
    const res = await server.inject({
      method: 'delete',
      url: `/admin/user/${regular.user.id}`
    })
    expect(res.statusCode).toBe(401)
  })

  test('401 status code when wrong JWT given', async () => {
    const res = await server.inject({
      method: 'delete',
      url: `/admin/user/${regular.user.id}`,
      headers: {
        'Authorization': 'You shall not pass'
      }
    })

    expect(res.statusCode).toBe(401)
  })

  test('403 status code when not admin JWT given', async () => {
    const res = await server.inject({
      method: 'delete',
      url: `/admin/user/${regular.user.id}`,
      headers: {
        'Authorization': regular.token
      }
    })

    expect(res.statusCode).toBe(403)
  })

  test('delete specifc user when admin calls', async () => {
    let garbage = await UserServices.register('Joe Garbage', 'garbage@topia.io', 'password')
    let res = await server.inject({
      method: 'delete',
      url: `/admin/user/${garbage.user.id}`,
      headers: {
        'Authorization': admin.token
      }
    })

    expect(res.statusCode).toBe(200)
    expect(res.result.user.deletedAt).not.toBe(null)

    res = await server.inject({
      method: 'delete',
      url: `/admin/user/${garbage.user.id}`,
      headers: {
        'Authorization': admin.token
      }
    })
    expect(res.statusCode).toBe(404)
  })
})

describe('GET /admin/user/{id}/deactivate', () => {
  test('401 status code when not JWT given', async () => {
    const res = await server.inject({
      method: 'put',
      url: `/admin/user/${regular.user.id}/deactivate`
    })
    expect(res.statusCode).toBe(401)
  })

  test('401 status code when wrong JWT given', async () => {
    const res = await server.inject({
      method: 'put',
      url: `/admin/user/${regular.user.id}/deactivate`,
      headers: {
        'Authorization': 'You shall not pass'
      }
    })

    expect(res.statusCode).toBe(401)
  })

  test('403 status code when not admin JWT given', async () => {
    const res = await server.inject({
      method: 'put',
      url: `/admin/user/${regular.user.id}/deactivate`,
      headers: {
        'Authorization': regular.token
      }
    })

    expect(res.statusCode).toBe(403)
  })

  test('deactivates specifc user when admin calls', async () => {
    const res = await server.inject({
      method: 'put',
      url: `/admin/user/${regular.user.id}/deactivate`,
      headers: {
        'Authorization': admin.token
      }
    })

    expect(res.statusCode).toBe(200)
    expect(res.result.user.active).toBe(false)
  })
})

describe('GET /admin/user/{id}/activate', () => {
  test('401 status code when not JWT given', async () => {
    const res = await server.inject({
      method: 'put',
      url: `/admin/user/${regular.user.id}/activate`
    })
    expect(res.statusCode).toBe(401)
  })

  test('401 status code when wrong JWT given', async () => {
    const res = await server.inject({
      method: 'put',
      url: `/admin/user/${regular.user.id}/activate`,
      headers: {
        'Authorization': 'You shall not pass'
      }
    })

    expect(res.statusCode).toBe(401)
  })

  test('403 status code when not admin JWT given', async () => {
    const res = await server.inject({
      method: 'put',
      url: `/admin/user/${regular.user.id}/activate`,
      headers: {
        'Authorization': regular.token
      }
    })

    expect(res.statusCode).toBe(403)
  })

  test('activates specifc user when admin calls', async () => {
    const res = await server.inject({
      method: 'put',
      url: `/admin/user/${regular.user.id}/activate`,
      headers: {
        'Authorization': admin.token
      }
    })

    expect(res.statusCode).toBe(200)
    expect(res.result.user.active).toBe(true)
  })
})

describe('GET /admin/user/{id}', () => {
  test('401 status code when not JWT given', async () => {
    const res = await server.inject({
      method: 'get',
      url: `/admin/user/${regular.user.id}`
    })
    expect(res.statusCode).toBe(401)
  })

  test('401 status code when wrong JWT given', async () => {
    const res = await server.inject({
      method: 'get',
      url: `/admin/user/${regular.user.id}`,
      headers: {
        'Authorization': 'You shall not pass'
      }
    })

    expect(res.statusCode).toBe(401)
  })

  test('403 status code when not admin JWT given', async () => {
    const res = await server.inject({
      method: 'get',
      url: `/admin/user/${regular.user.id}`,
      headers: {
        'Authorization': regular.token
      }
    })

    expect(res.statusCode).toBe(403)
  })

  test('returns specifc user when admin calls', async () => {
    const res = await server.inject({
      method: 'get',
      url: `/admin/user/${regular.user.id}`,
      headers: {
        'Authorization': admin.token
      }
    })

    expect(res.statusCode).toBe(200)
    expect(res.result.user.id).toBe(regular.user.id)
  })
})

describe('GET /admin/users', () => {
  test('401 status code when not JWT given', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/admin/users'
    })
    expect(res.statusCode).toBe(401)
  })

  test('401 status code when wrong JWT given', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/admin/users',
      headers: {
        'Authorization': 'You shall not pass'
      }
    })

    expect(res.statusCode).toBe(401)
  })

  test('403 status code when not admin JWT given', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/admin/users',
      headers: {
        'Authorization': regular.token
      }
    })

    expect(res.statusCode).toBe(403)
  })

  test('returns list of users when admin calls', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/admin/users',
      headers: {
        'Authorization': admin.token
      }
    })

    expect(res.statusCode).toBe(200)
    expect(res.result.users.length).toBeGreaterThan(0)
  })
})

describe('PUT /admin/user/{id}', () => {
  test('changes name when given', async () => {
    const res = await server.inject({
      method: 'put',
      url: `/admin/user/${regular.user.id}`,
      headers: {
        'Authorization': admin.token
      },
      payload: {
        name: 'New name'
      }
    })

    const { result } = res

    expect(res.statusCode).toBe(200)
    expect(result.user.name).not.toBe(regular.user.name)
    expect(result.user.id).toBe(regular.user.id)
    expect(result.user.deletedAt).toBe(null)
  })

  test('changes email when given', async () => {
    const res = await server.inject({
      method: 'put',
      url: `/admin/user/${regular.user.id}`,
      headers: {
        'Authorization': admin.token
      },
      payload: {
        email: 'new@superemail.com'
      }
    })

    const { result } = res

    expect(res.statusCode).toBe(200)
    expect(result.user.email).not.toBe(regular.user.email)
    expect(result.user.email).toBe('new@superemail.com')
    expect(result.user.id).toBe(regular.user.id)
  })

  test('changes password when given', async () => {
    const newPassword = 'newlongpassword'
    const res = await server.inject({
      method: 'put',
      url: `/admin/user/${regular.user.id}`,
      headers: {
        'Authorization': admin.token
      },
      payload: {
        password: newPassword
      }
    })
    const { result } = res

    const loginResponse = await UserServices.login(result.user.email, newPassword)

    expect(res.statusCode).toBe(200)
    expect(result.user.id).toBe(regular.user.id)
    expect(result.user.password).not.toBe(undefined)
    expect(result.user.id).toBe(loginResponse.user.id)
  })

  test('401 status code when not JWT given', async () => {
    const res = await server.inject({
      method: 'put',
      url: `/admin/user/${regular.user.id}`
    })
    expect(res.statusCode).toBe(401)
  })

  test('401 status code when wrong JWT given', async () => {
    const res = await server.inject({
      method: 'put',
      url: `/admin/user/${regular.user.id}`,
      headers: {
        'Authorization': 'You shall not pass'
      }
    })

    expect(res.statusCode).toBe(401)
  })

  test('403 status code when not admin JWT given', async () => {
    const res = await server.inject({
      method: 'put',
      url: `/admin/user/${regular.user.id}`,
      headers: {
        'Authorization': regular.token
      }
    })

    expect(res.statusCode).toBe(403)
  })
})
