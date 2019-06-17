import userRoutes from './user.js'
import organisationRoutes from './organisations.js'
import projectRoutes from './projects.js'
import adminRoutes from './admin'
import newsletterRoutes from './newsletter'
import ngoRoutes from './ngo'
import sdgTargets from './sdg_targets'
import oauth from './oauth'

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
  ...newsletterRoutes,
  ...ngoRoutes,
  ...sdgTargets,
  ...oauth
]
