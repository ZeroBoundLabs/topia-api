# Setup
* Install NodeJS v10.15.0
* Navigate to project directory
* Install dependencies `npm i`
* Create database config `cp ./config/config.json.example ./config/config.json`
* Provide PostgreSQL credentials `./config/config.json`
* Create database and migrate `npx sequelize db:create && npx sequelize db:migrate`
* Seed database (optional) `npx sequelize db:seed:all`
* Start the app `npm start`

# Run tests and linter (StandardJS)
* Setup database for test `./config/config.json`
* Create database `NODE_ENV=test npx sequelize db:create`
* Run linter and tests `npm test`
* Only linter `npm lint`

# Prepare production build
* Build `npm run build`
* `node dist/bundle.js`

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

# Documenting API routes (swagger)
As a project may be a mixture of web pages and API endpoints you need to tag the routes you wish Swagger to
document. Simply add the `tags: ['api']` property to the route object for any endpoint you want documenting.

You can even specify more tags and then later generate tag-specific documentation. If you specify
`tags: ['api', 'foo']`, you can later use `/documentation?tags=foo` to load the documentation on the
HTML page (see next section).

```Javascript
{
    method: 'GET',
    path: '/todo/{id}/',
    options: {
        handler: handlers.getToDo,
        description: 'Get todo',
        notes: 'Returns a todo item by the id passed in the path',
        tags: ['api'], // ADD THIS TAG
        validate: {
            params: {
                id : Joi.number()
                        .required()
                        .description('the id for the todo item'),
            }
        }
    },
}
```

Once you have tagged your routes start the application. __The plugin adds a page into your site with the route `/documentation`__,
so the the full URL for the above options would be `http://localhost:3000/documentation`.

# Ethereum development setup
* Install ganache-cli (Fast Ethereum RPC client for testing and development) `npm install -g ganache-cli`
* Install truffle `npm install -g truffle`
* Navigate to truffle directory `cd truffle`
* Run local node in the separate tab:
```
ganache-cli -p 7575 -i 5777 --db ./ganache_db -d -m race bridge north visit currenwheel kiss analyst mule melody potato coast
```
* Compile contracts `truffle compile`
* Migrate contracts `truffle migrate --reset`
* Test contracts `truffle test`

