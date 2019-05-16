!(function (e) {
  var t = {}
  function a (n) {
    if (t[n]) return t[n].exports
    var i = (t[n] = { i: n, l: !1, exports: {} })
    return e[n].call(i.exports, i, i.exports, a), (i.l = !0), i.exports
  }
  ;(a.m = e),
    (a.c = t),
    (a.d = function (e, t, n) {
      a.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n })
    }),
    (a.r = function (e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 })
    }),
    (a.t = function (e, t) {
      if ((1 & t && (e = a(e)), 8 & t)) return e
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e
      var n = Object.create(null)
      if (
        (a.r(n),
        Object.defineProperty(n, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var i in e)
          a.d(
            n,
            i,
            function (t) {
              return e[t]
            }.bind(null, i)
          )
      return n
    }),
    (a.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default
            }
          : function () {
              return e
            }
      return a.d(t, 'a', t), t
    }),
    (a.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }),
    (a.p = ''),
    a((a.s = 27))
})([
  function (e, t) {
    e.exports = require('joi')
  },
  function (e, t) {
    e.exports = require('boom')
  },
  function (e, t) {
    e.exports = require('ramda')
  },
  function (e) {
    e.exports = {
      development: {
        username: 'postgres',
        password: 'docker',
        database: 'topia_development',
        host: '127.0.0.1',
        dialect: 'postgres',
        jwtSecret: 'NeverShareYourSecret',
        serverPort: 3e3
      },
      test: {
        username: 'postgres',
        password: 'docker',
        database: 'topia_test',
        host: '127.0.0.1',
        dialect: 'postgres',
        jwtSecret: 'NeverShareYourSecret',
        logging: !1
      },
      production: {
        username: 'postgres',
        password: 'docker',
        database: 'topia_development',
        host: '127.0.0.1',
        dialect: 'postgres',
        jwtSecret: 'NeverShareYourSecret',
        serverPort: 3e3
      }
    }
  },
  function (e, t) {
    e.exports = require('sequelize')
  },
  function (e, t) {
    e.exports = require('bcrypt')
  },
  function (e, t) {
    e.exports = require('hapi')
  },
  function (e, t) {
    e.exports = require('jsonwebtoken')
  },
  function (e, t) {
    e.exports = require('fs')
  },
  function (e, t) {
    e.exports = require('util')
  },
  function (e, t) {
    e.exports = require('inert')
  },
  function (e, t) {
    e.exports = require('vision')
  },
  function (e, t) {
    e.exports = require('hapi-swagger')
  },
  function (e) {
    e.exports = {
      name: 'topia-api',
      version: '1.0.0',
      description: '',
      main: 'index.js',
      scripts: {
        pretest:
          'NODE_ENV=test npx sequelize db:drop && NODE_ENV=test npx sequelize db:create && NODE_ENV=test npx sequelize db:migrate',
        lint: 'standard | snazzy',
        format: "prettier-standard '**/*.js'",
        test: 'standard | snazzy && NODE_ENV=test jest --detectOpenHandles',
        'vscode-test-debug':
          'NODE_ENV=test npx sequelize db:drop && NODE_ENV=test npx sequelize db:create && NODE_ENV=test npx sequelize db:migrate && NODE_ENV=test node --nolazy --inspect-brk=9229 node_modules/.bin/jest --detectOpenHandles',
        start: 'nodemon --exec babel-node index.js',
        build: 'webpack'
      },
      author: '',
      license: 'MIT',
      devDependencies: {
        '@babel/core': '^7.4.3',
        '@babel/node': '^7.2.2',
        jest: '^24.7.1',
        nodemon: '^1.18.11',
        standard: '^12.0.1',
        webpack: '^4.31.0',
        'webpack-cli': '^3.3.2',
        'webpack-node-externals': '^1.7.2'
      },
      dependencies: {
        '@babel/preset-env': '^7.4.3',
        '@hapi/good': '^8.2.0',
        '@hapi/good-console': '^8.1.0',
        '@hapi/good-squeeze': '^5.2.0',
        'babel-jest': '^24.7.1',
        bcrypt: '^3.0.6',
        boom: '^7.3.0',
        'form-data': '^2.3.3',
        'good-file': '^6.0.1',
        hapi: '^18.1.0',
        'hapi-auth-jwt2': '^8.4.0',
        'hapi-swagger': '^9.4.2',
        husky: '^2.3.0',
        inert: '^5.1.3',
        joi: '^14.3.1',
        jsonwebtoken: '^8.5.1',
        'lint-staged': '^8.1.7',
        pg: '^7.10.0',
        'pg-hstore': '^2.3.2',
        'prettier-standard': '^9.1.1',
        ramda: '^0.26.1',
        sequelize: '^5.7.5',
        'sequelize-cli': '^5.4.0',
        snazzy: '^8.0.0',
        'stream-to-promise': '^2.2.0',
        vision: '^5.4.4'
      },
      standard: { env: ['jest'], ignore: ['/truffle'] },
      husky: { hooks: { 'pre-commit': 'lint-staged' } },
      'lint-staged': {
        linters: { '**/*.js': ['prettier-standard', 'git add'] }
      }
    }
  },
  function (e, t) {
    e.exports = require('hapi-auth-jwt2')
  },
  function (e, t) {
    e.exports = require('@hapi/good')
  },
  function (e, t, a) {
    'use strict'
    e.exports = (e, t) => {
      const a = e.define(
        'Kpi',
        { name: t.STRING, organisation_id: t.INTEGER },
        {}
      )
      return (a.associate = function (e) {}), a
    }
  },
  function (e, t, a) {
    'use strict'
    e.exports = (e, t) => {
      const a = e.define(
        'organisation_user',
        { role: t.STRING, organisation_id: t.INTEGER, user_id: t.INTEGER },
        {}
      )
      return (
        (a.associate = function (e) {
          a.belongsTo(e.organisation, { foreignKey: 'organisation_id' }),
            a.belongsTo(e.user, { foreignKey: 'user_id' })
        }),
        a
      )
    }
  },
  function (e, t, a) {
    'use strict'
    e.exports = (e, t) => {
      const a = e.define(
        'organisation',
        {
          name: t.STRING,
          email: t.STRING,
          logo: t.STRING,
          type: t.STRING,
          description: t.STRING(2e3),
          createdAt: { allowNull: !1, type: t.DATE },
          updatedAt: { allowNull: !1, type: t.DATE },
          deletedAt: { type: t.DATE }
        },
        {}
      )
      return (
        (a.associate = function (e) {
          a.hasMany(e.project, { foreignKey: 'organisation_id' }),
            a.belongsToMany(e.user, {
              otherKey: 'user_id',
              foreignKey: 'organisation_id',
              through: 'organisation_user'
            })
        }),
        a
      )
    }
  },
  function (e, t, a) {
    'use strict'
    e.exports = (e, t) => {
      const a = e.define(
        'project',
        { name: t.STRING, organisation_id: t.INTEGER, deletedAt: t.DATE },
        {}
      )
      return (
        (a.associate = function (e) {
          a.belongsTo(e.organisation, { foreignKey: 'organisation_id' })
        }),
        a
      )
    }
  },
  function (e, t, a) {
    'use strict'
    e.exports = (e, t) => {
      const a = e.define(
        'sdg',
        { name: t.STRING, sdg_no: t.INTEGER, description: t.TEXT },
        {}
      )
      return (a.associate = function (e) {}), a
    }
  },
  function (e, t, a) {
    'use strict'
    e.exports = (e, t) => {
      const a = e.define(
        'tpi',
        {
          name: t.STRING,
          data: t.STRING,
          project_id: t.INTEGER,
          sdg_indicator_id: t.INTEGER,
          sdg_target_id: t.INTEGER,
          sdg_id: t.INTEGER,
          tpi_id: t.INTEGER
        },
        {}
      )
      return (
        (a.associate = function (e) {
          a.belongsTo(e.project, { foreignKey: 'project_id' }),
            a.belongsTo(e.sdg_indicator, { foreignKey: 'sdg_indicator_id' }),
            a.belongsTo(e.sdg_target, { foreignKey: 'sdg_target_id' }),
            a.belongsTo(e.sdg, { foreignKey: 'sdg_id' }),
            a.belongsTo(e.tpi, { foreignKey: 'tpi_id' })
        }),
        a
      )
    }
  },
  function (e, t, a) {
    'use strict'
    e.exports = (e, t) => {
      const a = e.define(
        'user',
        {
          name: t.STRING,
          email: t.STRING,
          password: t.STRING,
          active: t.BOOLEAN,
          role: t.STRING,
          avatarFilename: t.STRING,
          deletedAt: t.DATE
        },
        {}
      )
      return (a.associate = function (e) {}), a
    }
  },
  function (e, t, a) {
    'use strict'
    e.exports = (e, t) => {
      const a = e.define(
        'project_tpi',
        { role: t.STRING, project_id: t.INTEGER, tpi_id: t.INTEGER },
        {}
      )
      return (
        (a.associate = function (e) {
          a.belongsTo(e.project, { foreignKey: 'project_id' }),
            a.belongsTo(e.tpi, { foreignKey: 'tpi_id' })
        }),
        a
      )
    }
  },
  function (e, t, a) {
    'use strict'
    e.exports = (e, t) => {
      const a = e.define(
        'sdg_target',
        { name: t.STRING, sdg_id: t.INTEGER, description: t.TEXT },
        {}
      )
      return (
        (a.associate = function (e) {
          a.belongsTo(e.sdg, { foreignKey: 'sdg_id' })
        }),
        a
      )
    }
  },
  function (e, t, a) {
    'use strict'
    e.exports = (e, t) => {
      const a = e.define(
        'sdg_indicator',
        {
          name: t.STRING,
          code: t.STRING,
          sdg_target_id: t.INTEGER,
          description: t.TEXT
        },
        {}
      )
      return (
        (a.associate = function (e) {
          a.belongsTo(e.sdg_target, { foreignKey: 'sdg_target_id' })
        }),
        a
      )
    }
  },
  function (e, t, a) {
    'use strict'
    e.exports = (e, t) => {
      const a = e.define(
        'tpi_data',
        {
          title: t.STRING,
          description: t.STRING,
          tpi_id: t.INTEGER,
          tpi_data_id: t.INTEGER
        },
        {}
      )
      return (
        (a.associate = e => {
          a.belongsTo(e.tpi, { foreignKey: 'tpi_id' })
        }),
        a
      )
    }
  },
  function (e, t, a) {
    'use strict'
    a.r(t)
    var n = a(6),
      i = a.n(n),
      r = a(0),
      o = a.n(r),
      s = a(4),
      d = a.n(s),
      u = a(3)
    const c = u.production
    let p = {}
    var l = (function (e, t = !1) {
        if (Object.keys(p).length && !t) return p
        const n = new d.a(e.database, e.username, e.password, {
          host: e.host,
          dialect: e.dialect,
          logging: e.logging
        })
        return (
          [
            a(16),
            a(17),
            a(18),
            a(19),
            a(20),
            a(21),
            a(22),
            a(23),
            a(24),
            a(25),
            a(26)
          ].forEach(t => {
            const a = t(n, d.a, e)
            p[a.name] = a
          }),
          Object.keys(p).forEach(e => {
            'associate' in p[e] && p[e].associate(p)
          }),
          (p.sequelize = n),
          (p.Sequelize = d.a),
          p
        )
      })(c),
      g = a(5),
      m = a.n(g),
      h = a(7),
      w = a.n(h),
      f = a(1),
      y = a.n(f)
    var T = { ...u.production, env: 'production' },
      b = a(2),
      v = a(8),
      j = a.n(v),
      E = a(9)
    const _ = Object(E.promisify)(j.a.writeFile),
      x = async (e, t, a) => {
        let n
        return (
          'user_avatar' === a && (n = `uploads/users/${e}`),
          'organisation_logo' === a && (n = `uploads/organisations/${e}`),
          await _(`./${n}`, t),
          n
        )
      },
      N = async (e, t) => {
        return (await l.user.findOne({ where: { id: e.id } }))
          ? { isValid: !0 }
          : { isValid: !1 }
      },
      G = async e => {
        return await m.a.hash(e, 12)
      },
      A = e => {
        const { id: t, email: a, name: n, role: i } = e
        return { token: R(e), user: { id: t, email: a, name: n, role: i } }
      },
      R = ({ id: e, name: t, role: a }) =>
        w.a.sign({ id: e, name: t, scope: a }, T.jwtSecret, {
          expiresIn: '30d'
        }),
      q = async e => {
        const t = await l.user.findOne({
          where: { id: e },
          attributes: { exclude: ['password'] }
        })
        if (!t || null !== t.deletedAt) throw y.a.notFound('User not found')
        return t
      },
      S = e => ({
        id: e.id,
        name: e.name,
        email: e.email,
        active: e.active,
        role: e.role,
        password: e.password,
        avatarFilename: e.avatarFilename,
        createdAt: e.createdAt,
        updatedAt: e.updatedAt,
        deletedAt: e.deletedAt
      })
    var I = async (e, t, a) => {
        let n = await l.user.findOne({ where: { email: t } })
        if (n) throw y.a.conflict('Email taken')
        const i = await G(a)
        return (
          (n = await l.user.create({ name: e, email: t, password: i })), A(n)
        )
      },
      O = async (e, t) => {
        const a = await l.user.findOne({ where: { email: e } })
        if (!a || null !== a.deletedAt) throw y.a.notFound('User not found')
        if (!(await m.a.compare(t, a.password)))
          throw y.a.notFound('Wrong password')
        return A(a)
      },
      k = async () => {
        return await l.user.findAll({ attributes: { exclude: ['password'] } })
      },
      z = q,
      D = async e => {
        const t = await q(e)
        return (t.active = !0), await t.save(), S(t)
      },
      P = async e => {
        const t = await q(e)
        return (t.active = !1), await t.save(), S(t)
      },
      U = async (e, t) => {
        const a = await q(e),
          n = Object(b.pick)(['name', 'email', 'password'], t)
        if ((n.password && (n.password = await G(n.password)), t.avatarFile)) {
          const a = t.avatarFile,
            i = a._data,
            r = `avatar-${e}-${a.hapi.filename}`
          await x(r, i, 'user_avatar'), (n.avatarFilename = r)
        }
        return await a.update(n), S(a)
      },
      F = async e => {
        const t = await q(e)
        return A(t)
      },
      W = async (e, t) => {
        const a = await q(e)
        return await a.update({ role: t }), S(a)
      },
      J = async e => {
        const t = await q(e)
        return (t.deletedAt = new Date()), await t.save(), S(t)
      },
      K = [
        {
          method: 'GET',
          path: '/user-project',
          handler: (e, t) => ({ a: 123 })
        },
        {
          method: 'GET',
          path: '/user',
          options: {
            auth: 'jwt',
            description: 'Get user',
            notes:
              'Returns user object. JWT token must be provided in the header.',
            tags: ['api']
          },
          handler: async (e, t) => {
            const { id: a } = e.auth.credentials
            return await F(a)
          }
        },
        {
          method: 'PUT',
          path: '/user',
          options: {
            auth: 'jwt',
            description: 'Update user',
            notes:
              'Allows to update personal data of user. JWT token must be provided in the header.',
            tags: ['api'],
            validate: {
              payload: {
                name: o.a
                  .string()
                  .min(3)
                  .max(200),
                email: o.a.string().email(),
                password: o.a
                  .string()
                  .min(3)
                  .max(200),
                avatarFile: o.a.any()
              }
            },
            payload: { output: 'stream' }
          },
          handler: async (e, t) => {
            const { id: a } = e.auth.credentials
            return await U(a, e.payload)
          }
        },
        {
          method: 'POST',
          path: '/user/login',
          handler: async (e, t) => {
            const { email: a, password: n } = e.payload
            return await O(a, n)
          },
          options: {
            auth: !1,
            description: 'Login',
            notes: 'Allows to login user. In exchange you will receive JWT.',
            tags: ['api'],
            validate: {
              payload: {
                email: o.a
                  .string()
                  .email()
                  .required(),
                password: o.a
                  .string()
                  .min(3)
                  .max(200)
                  .required()
              }
            }
          }
        },
        {
          method: 'POST',
          path: '/user/register',
          handler: async (e, t) => {
            const { name: a, email: n, password: i } = e.payload
            return await I(a, n, i)
          },
          options: {
            auth: !1,
            description: 'Register',
            notes: 'Allows to register new user.',
            tags: ['api'],
            validate: {
              payload: {
                name: o.a
                  .string()
                  .min(3)
                  .max(200)
                  .required(),
                email: o.a
                  .string()
                  .email()
                  .required(),
                password: o.a
                  .string()
                  .min(3)
                  .max(200)
                  .required()
              }
            }
          }
        },
        {
          method: 'GET',
          path: '/uploads/users/{file*}',
          handler: { directory: { path: 'uploads/users' } }
        }
      ]
    const M = async (e, t) => {
        const a = t._data,
          n = `logo-${e.id}-${t.hapi.filename}`
        return (
          await x(n, a, 'organisation_logo'),
          await e.update({ logo: n }, { fields: ['logo'] })
        )
      },
      V = async e => {
        const t = await l.organisation.findOne({
          where: { id: e, deletedAt: null }
        })
        if (t) return t
        throw y.a.notFound('Organisation not found')
      },
      $ = async (e, t) => {
        return (await e.getUsers({ where: { id: t } })).length > 0
      },
      L = e => ({
        id: e.id,
        name: e.name,
        email: e.email,
        logo: e.logo,
        type: e.type,
        description: e.description,
        createdAt: e.createdAt,
        updatedAt: e.updatedAt,
        deletedAt: e.deletedAt
      })
    var H = {
        findAll: async () => {
          return (await l.organisation.findAll({
            where: { deletedAt: null }
          })).map(e => L(e))
        },
        create: async (e, t) => {
          const a = Object(b.pick)(
            ['name', 'email', 'logo', 'type', 'description'],
            t
          )
          let n = await l.organisation.create({ ...a })
          const i = await l.user.findOne({ where: { id: e } })
          return (
            n.addUser(i, { through: { role: 'admin ' } }),
            t.logoFile && (n = await M(n, t.logoFile)),
            L(n)
          )
        },
        destroy: async (e, t) => {
          const a = await V(e)
          if (!(await $(a, t)))
            throw y.a.unauthorized('Unsufficient permissions')
          return (a.deletedAt = new Date()), await a.save(), a
        },
        getOne: async e => {
          const t = await V(e)
          return L(t)
        },
        update: async (e, t, a) => {
          const n = await V(e)
          if (await $(n, a)) {
            const e = Object(b.pick)(
              ['name', 'email', 'logo', 'type', 'description'],
              t
            )
            let a = await n.update(e)
            return t.logoFile && (a = await M(a, t.logoFile)), L(a)
          }
          throw y.a.unauthorized('Insufficient permissions')
        },
        addUser: async (e, t, a) => {
          const n = await V(e)
          if (!(await $(n, t)))
            throw y.a.unauthorized('Unsufficient permissions')
          {
            const e = await l.user.findOne({ where: { id: a.userId } })
            n.addUser(e, { through: { role: a.role } })
          }
          return n
        },
        removeUser: async (e, t, a) => {
          const n = await V(e)
          if (!(await $(n, t)))
            throw y.a.unauthorized('Unsufficient permissions')
          {
            const t = await l.organisation_user.findOne({
              where: { organisation_id: e, user_id: a.userId }
            })
            if (!t) throw y.a.notFound('No such user')
            await t.destroy({ force: !0 })
          }
          return n
        },
        addProject: async (e, t, a) => {
          const n = await V(e)
          if (await $(n, t)) return await n.createProject({ name: a.name })
          throw y.a.unauthorized('Unsufficient permissions')
        },
        getAllProjects: async e => {
          const t = await V(e)
          return await t.getProjects()
        },
        isMember: $
      },
      C = [
        {
          method: 'GET',
          path: '/organisations',
          options: {
            description: 'Get all',
            notes: 'Returns array of organisation objects.',
            tags: ['api']
          },
          handler: async (e, t) => {
            return await H.findAll()
          }
        },
        {
          method: 'GET',
          path: '/organisations/{id}',
          options: {
            description: 'Get by id',
            notes: 'Returns object of specific organisation.',
            tags: ['api']
          },
          handler: async (e, t) => {
            return await H.getOne(e.params.id)
          }
        },
        {
          method: 'POST',
          path: '/organisations',
          options: {
            auth: 'jwt',
            description: 'Create',
            notes: 'Allows to create new organisation. JWT required.',
            tags: ['api'],
            validate: {
              payload: {
                name: o.a
                  .string()
                  .min(3)
                  .max(200),
                email: o.a.string().email(),
                logo: o.a
                  .string()
                  .min(3)
                  .max(200),
                type: o.a
                  .string()
                  .min(3)
                  .max(200),
                description: o.a
                  .string()
                  .min(3)
                  .max(2e3),
                logoFile: o.a.any()
              }
            },
            payload: { output: 'stream' }
          },
          handler: async (e, t) => {
            const a = e.auth.credentials.id,
              { payload: n } = e
            return H.create(a, n)
          }
        },
        {
          method: 'PUT',
          path: '/organisations/{id}',
          handler: async (e, t) => {
            const a = e.auth.credentials.id,
              { payload: n } = e
            return H.create(e.params.id, n, a)
          },
          options: {
            auth: 'jwt',
            description: 'Update',
            notes: 'Allows to update organisation. JWT required.',
            tags: ['api'],
            validate: {
              payload: {
                name: o.a
                  .string()
                  .min(3)
                  .max(200),
                email: o.a.string().email(),
                logo: o.a
                  .string()
                  .min(3)
                  .max(200),
                type: o.a
                  .string()
                  .min(3)
                  .max(200),
                description: o.a
                  .string()
                  .min(3)
                  .max(2e3),
                logoFile: o.a.any()
              }
            }
          }
        },
        {
          method: 'DELETE',
          path: '/organisations/{id}',
          options: {
            auth: 'jwt',
            description: 'Delete',
            notes: 'Allows to delete organisation. JWT required.',
            tags: ['api']
          },
          handler: async (e, t) => {
            const a = e.auth.credentials.id
            return await H.destroy(e.params.id, a)
          }
        },
        {
          method: 'POST',
          path: '/organisations/{id}/users',
          options: {
            auth: 'jwt',
            description: 'Add user',
            notes: 'Add new user to organisation. JWT required.',
            tags: ['api'],
            validate: {
              payload: {
                userId: o.a
                  .number()
                  .integer()
                  .required(),
                role: o.a.string().required()
              }
            }
          },
          handler: async (e, t) => {
            const a = e.auth.credentials.id
            return await H.addUser(e.params.id, a, e.payload)
          }
        },
        {
          method: 'DELETE',
          path: '/organisations/{id}/users',
          options: {
            auth: 'jwt',
            description: 'Remove user',
            notes: 'Removes user from organisation. JWT required.',
            tags: ['api'],
            validate: {
              payload: {
                userId: o.a
                  .number()
                  .integer()
                  .required()
              }
            }
          },
          handler: async (e, t) => {
            const a = e.auth.credentials.id
            return await H.removeUser(e.params.id, a, e.payload)
          }
        },
        {
          method: 'POST',
          path: '/organisations/{id}/projects',
          options: {
            auth: 'jwt',
            description: 'Create project',
            notes: 'Add new project under organisation. JWT required.',
            tags: ['api'],
            validate: { payload: { name: o.a.string().required() } }
          },
          handler: async (e, t) => {
            const a = e.auth.credentials.id
            return await H.addProject(e.params.id, a, e.payload)
          }
        },
        {
          method: 'GET',
          path: '/organisations/{id}/projects',
          options: {
            description: 'Get all projects',
            notes: 'Returns array of given organisation projects ',
            tags: ['api']
          },
          handler: async (e, t) => {
            return await H.getAllProjects(e.params.id)
          }
        }
      ]
    const X = async e => {
      const t = await l.project.findOne({ where: { id: e, deletedAt: null } })
      if (t) return t
      throw y.a.notFound('Project not found')
    }
    var Y = async () => {
        return await l.project.findAll({ where: { deletedAt: null } })
      },
      B = X,
      Q = async (e, t, a) => {
        const n = await X(e),
          i = await n.getOrganisation()
        return (
          (await H.isMember(i, a)) && (await n.update(t, { fields: ['name'] })),
          n
        )
      },
      Z = async (e, t) => {
        const a = await X(e),
          n = await a.getOrganisation()
        return (
          (await H.isMember(n, t)) &&
            ((a.deletedAt = new Date()), await a.save()),
          a
        )
      },
      ee = [
        {
          method: 'GET',
          path: '/projects',
          options: {
            description: 'Get all',
            notes: 'Returns array of projects objects.',
            tags: ['api']
          },
          handler: async (e, t) => {
            return await Y()
          }
        },
        {
          method: 'GET',
          path: '/projects/{id}',
          options: {
            description: 'Get by id',
            notes: 'Returns object of specific project.',
            tags: ['api']
          },
          handler: async (e, t) => {
            return await B(e.params.id)
          }
        },
        {
          method: 'PUT',
          path: '/projects/{id}',
          handler: async (e, t) => {
            const a = e.auth.credentials.id,
              { payload: n } = e
            return Q(e.params.id, n, a)
          },
          options: {
            auth: 'jwt',
            description: 'Update',
            notes: 'Allows to update project. JWT required.',
            tags: ['api'],
            validate: {
              payload: {
                name: o.a
                  .string()
                  .min(3)
                  .max(200)
              }
            }
          }
        },
        {
          method: 'DELETE',
          path: '/projects/{id}',
          options: {
            auth: 'jwt',
            description: 'Delete',
            notes: 'Allows to delete project. JWT required.',
            tags: ['api']
          },
          handler: async (e, t) => {
            const a = e.auth.credentials.id
            return await Z(e.params.id, a)
          }
        }
      ]
    const te = { strategy: 'jwt', access: [{ scope: ['admin'] }] }
    var ae = [
        {
          method: 'GET',
          path: '/',
          config: { auth: !1 },
          handler: (e, t) => 'Hello World! (token not required)'
        },
        ...[
          ...[
            {
              method: 'GET',
              path: '/admin/users',
              options: {
                auth: te,
                description: 'Get all users',
                notes:
                  'Returns all users existing in system. JWT token must be provided in the header and caller must be an admin.',
                tags: ['api']
              },
              handler: async (e, t) => {
                return { users: await k() }
              }
            },
            {
              method: 'GET',
              path: '/admin/user/{id}',
              options: {
                auth: te,
                description: 'Get user',
                notes:
                  'Returns specific user existing in system. JWT token must be provided in the header and caller must be an admin.',
                tags: ['api']
              },
              handler: async (e, t) => {
                return { user: await z(e.params.id) }
              }
            },
            {
              method: 'PUT',
              path: '/admin/user/{id}/activate',
              options: {
                auth: te,
                description: 'Activate user',
                notes:
                  'Activate user. JWT token must be provided in the header and caller must be an admin.',
                tags: ['api']
              },
              handler: async (e, t) => {
                return { user: await D(e.params.id) }
              }
            },
            {
              method: 'PUT',
              path: '/admin/user/{id}/deactivate',
              options: {
                auth: te,
                description: 'Deactivate user',
                notes:
                  'Deactivate user. JWT token must be provided in the header and caller must be an admin.',
                tags: ['api']
              },
              handler: async (e, t) => {
                return { user: await P(e.params.id) }
              }
            },
            {
              method: 'PUT',
              path: '/admin/user/{id}',
              options: {
                auth: te,
                description: 'Update user',
                notes:
                  'Updates user data. JWT token must be provided in the header and caller must be an admin.',
                tags: ['api'],
                validate: {
                  payload: {
                    name: o.a
                      .string()
                      .min(3)
                      .max(200),
                    email: o.a.string().email(),
                    password: o.a
                      .string()
                      .min(3)
                      .max(200),
                    role: o.a
                      .string()
                      .min(3)
                      .max(200)
                  }
                }
              },
              handler: async (e, t) => {
                const { payload: a } = e
                let n = await U(e.params.id, a)
                return a.role && (n = await W(e.params.id, a.role)), { user: n }
              }
            },
            {
              method: 'DELETE',
              path: '/admin/user/{id}',
              options: {
                auth: te,
                description: 'Delete user',
                notes:
                  'Deletes user (soft delete). JWT token must be provided in the header and caller must be an admin.',
                tags: ['api']
              },
              handler: async (e, t) => {
                return { user: await J(e.params.id) }
              }
            }
          ]
        ],
        ...K,
        ...C,
        ...ee
      ],
      ne = a(10),
      ie = a.n(ne),
      re = a(11),
      oe = a.n(re),
      se = a(12),
      de = a.n(se),
      ue = a(13),
      ce = a(14),
      pe = a.n(ce),
      le = a(15),
      ge = a.n(le)
    const me = {
        info: { title: 'TOPIA API Documentation', version: ue.version }
      },
      he = async () => {
        const e = {
          port: T.serverPort || 3e3,
          host: 'localhost',
          routes: { cors: !0 }
        }
        let t
        'development' === T.env &&
          ((e.debug = { request: ['error'] }),
          (t = {
            myConsoleReporter: [
              {
                module: '@hapi/good-squeeze',
                name: 'Squeeze',
                args: [{ log: '*', response: '*' }]
              },
              { module: '@hapi/good-console' },
              'stdout'
            ]
          })),
          'production' === T.env &&
            (t = {
              fileReporter: [
                {
                  module: '@hapi/good-squeeze',
                  name: 'Squeeze',
                  args: [{ log: '*', response: '*' }]
                },
                { module: '@hapi/good-squeeze', name: 'SafeJson' },
                { module: 'good-file', args: ['./logs/production'] }
              ]
            })
        const a = i.a.server(e)
        return (
          await a.register([
            ie.a,
            oe.a,
            { plugin: de.a, options: me },
            pe.a,
            { plugin: ge.a, options: { reporters: t } }
          ]),
          a.auth.strategy('jwt', 'jwt', {
            key: T.jwtSecret,
            validate: N,
            verifyOptions: { algorithms: ['HS256'] }
          }),
          a.route(ae),
          a
        )
      }
    process.on('unhandledRejection', e => {
      console.log(e), process.exit(1)
    }),
      (async () => {
        const e = await he()
        await e.start(), console.log(`Server running at: ${e.info.uri}`)
      })()
  }
])
