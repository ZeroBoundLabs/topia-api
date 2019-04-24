# Setup
* Install NodeJS v10.15.0
* Install dependencies `npm i`
* Create database config `cp ./config/config.json.example ./config/config.json`
* Provide PostgreSQL credentials `./config/config.json`

# Sequelize CLI commands (migrations)
`npx sequelize [command]` or `node_modules/.bin/sequelize [command]`

```
sequelize db:migrate                        Run pending migrations
  sequelize db:migrate:schema:timestamps:add  Update migration table to have timestamps
  sequelize db:migrate:status                 List the status of all migrations
  sequelize db:migrate:undo                   Reverts a migration
  sequelize db:migrate:undo:all               Revert all migrations ran
  sequelize db:seed                           Run specified seeder
  sequelize db:seed:undo                      Deletes data from the database
  sequelize db:seed:all                       Run every seeder
  sequelize db:seed:undo:all                  Deletes data from the database
  sequelize db:create                         Create database
  sequelize db:drop                           Drop database
  sequelize init                              Initializes project
  sequelize init:config                       Initializes configuration
  sequelize init:migrations                   Initializes migrations
  sequelize init:models                       Initializes models
  sequelize init:seeders                      Initializes seeders
  sequelize migration:generate                Generates a new migration file
  sequelize model:generate                    Generates a model and its migration
  sequelize seed:generate                     Generates a new seed file
```
