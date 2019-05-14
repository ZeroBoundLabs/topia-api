import userRoutes from './user.js'
import adminRoutes from './admin'

const rootUrl = {
  method: 'GET',
  path: '/',
  config: { auth: false },
  handler: (request, h) => {
    return 'Hello World! (token not required)'
  }
}

export default [rootUrl, ...adminRoutes, ...userRoutes]
