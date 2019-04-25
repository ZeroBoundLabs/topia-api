import Hapi from 'hapi'
import routes from './routes'
import { validate } from './services/user'
import config from './config.js'

const init = async () => {
  const params = {
    port: 3000,
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

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
