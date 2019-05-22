import Hapi from 'hapi'
import routes from './routes'
import { validate } from './services/user'
import config from './config.js'
import Inert from 'inert'
import Vision from 'vision'
import HapiSwagger from 'hapi-swagger'
import Pack from './package.json'
import HapiJWT from 'hapi-auth-jwt2'
import Good from '@hapi/good'

const swaggerOptions = {
  info: {
    title: 'TOPIA API Documentation',
    version: Pack.version
  }
}

const setupServer = async () => {
  const params = {
    port: config.serverPort || 3000,
    host: '0.0.0.0',
    routes: { cors: true }
  }

  let reporters

  if (config.env === 'development') {
    params.debug = { request: ['error'] }
    reporters = {
      myConsoleReporter: [
        {
          module: '@hapi/good-squeeze',
          name: 'Squeeze',
          args: [{ log: '*', response: '*' }]
        },
        {
          module: '@hapi/good-console'
        },
        'stdout'
      ]
    }
  }

  if (config.env === 'production') {
    reporters = {
      fileReporter: [
        {
          module: '@hapi/good-squeeze',
          name: 'Squeeze',
          args: [{ log: '*', response: '*' }]
        },
        {
          module: '@hapi/good-squeeze',
          name: 'SafeJson'
        },
        {
          module: 'good-file',
          args: ['./logs/production']
        }
      ]
    }
  }

  const server = Hapi.server(params)

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    },
    HapiJWT,
    {
      plugin: Good,
      options: { reporters }
    }
  ])

  server.auth.strategy('jwt', 'jwt', {
    key: config.jwtSecret,
    validate: validate,
    verifyOptions: { algorithms: ['HS256'] }
  })
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
