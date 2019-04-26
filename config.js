import path from 'path'
const env = process.env.NODE_ENV || 'development'
const config = require(path.join(__dirname, '/config/config.json'))[env]

export default { ...config, env }
