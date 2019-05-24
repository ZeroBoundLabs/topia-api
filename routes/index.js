import userRoutes from './user.js'
import organisationRoutes from './organisations.js'
import projectRoutes from './projects.js'
import adminRoutes from './admin'
import newsletterRoutes from './newsletter'

const rootUrl = {
  method: 'GET',
  path: '/',
  config: { auth: false },
  handler: (request, h) => {
    return 'Hello World! (token not required)'
  }
}

export default [
  rootUrl,
  ...adminRoutes,
  ...userRoutes,
  ...organisationRoutes,
  ...projectRoutes,
  ...newsletterRoutes
]
