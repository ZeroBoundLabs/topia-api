import configJson from './config/config.json'
const env = process.env.NODE_ENV || 'development'

export default { ...configJson[env], env }
