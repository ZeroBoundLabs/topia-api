import Hapi from 'hapi'
import routes from './routes'
import { validate } from './services/user'
import config from './config.js'

const setupServer = async () => {
  const params = {
    port: config.port,
    host: 'localhost',
    routes: { cors: true }
  }

  if (config.env === 'development') {
    params.debug = { request: ['error'] }
  }

  const server = Hapi.server(params)

  await server.register(require('hapi-auth-jwt2'))

  server.auth.strategy('jwt', 'jwt',
    { key: config.jwtSecret,
      validate: validate,
      verifyOptions: { algorithms: [ 'HS256' ] }
    }
  )
  server.route(routes)

  return server
}

export const init = async () => {
  const server = await setupServer()
  await server.initialize()

  return server
}

export const start = async () => {
  const server = await setupServer()
  await server.start()
  console.log(`Server running at: ${server.info.uri}`)

  return server
}
