import Hapi from 'hapi'
import routes from './routes'
import { validate } from './services/user'
import config from './config.js'
import Inert from 'inert'
import Vision from 'vision'
import HapiSwagger from 'hapi-swagger'
import Pack from './package.json'
import HapiJWT from 'hapi-auth-jwt2'

const swaggerOptions = {
  info: {
    title: 'TOPIA API Documentation',
    version: Pack.version
  }
}

const setupServer = async () => {
  const params = {
    port: 3000,
    host: 'localhost',
    routes: { cors: true }
  }

  if (config.env === 'development') {
    params.debug = { request: ['error'] }
  }

  const server = Hapi.server(params)

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    },
    HapiJWT
  ])

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
