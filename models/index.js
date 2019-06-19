import Sequelize from 'sequelize'
import configJson from '../config/config.json'

const env = process.env.NODE_ENV || 'development'
const config = configJson[env]
let models = {}

function getModels (config, force = false) {
  if (Object.keys(models).length && !force) {
    return models
  }

  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    { host: config.host, dialect: config.dialect, logging: config.logging }
  )

  // Include modules manually, so Webpack understands it
  let modules = [
    require('./kpi.js'),
    require('./organisation_user.js'),
    require('./organisation.js'),
    require('./project.js'),
    require('./sdg.js'),
    require('./tpi.js'),
    require('./user.js'),
    require('./project_tpi.js'),
    require('./sdg_target.js'),
    require('./sdg_indicator.js'),
    require('./tpi_data.js'),
    require('./newsletter_email.js'),
    require('./project_sdg_target.js'),
    require('./transaction.js')
  ]

  // Initialize models
  modules.forEach((module) => {
    const model = module(sequelize, Sequelize, config)
    models[model.name] = model
  })

  // Apply associations
  Object.keys(models).forEach((key) => {
    if ('associate' in models[key]) {
      models[key].associate(models)
    }
  })

  models.sequelize = sequelize
  models.Sequelize = Sequelize

  return models
}

export default getModels(config)
