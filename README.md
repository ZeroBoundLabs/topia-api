# TOPIA API

A REST API for managing nonprofit and NGO projects, tracking their real-world impact against the **UN Sustainable Development Goals (SDGs)**. Organizations can register, create projects, link them to specific SDG targets, and collect indicator data to measure progress — with an optional Ethereum smart-contract layer for issuing verifiable impact badges.

## Features

- **Organization management** — Create org profiles, manage team members and roles, upload logos and banners
- **Project tracking** — Define projects with descriptions, funding, geographic coordinates, and timelines
- **SDG alignment** — Link projects to UN SDG targets and indicators; track KPIs and TPIs with historical data points
- **User accounts** — Registration, JWT authentication, password reset, Facebook OAuth
- **NGO onboarding** — Single-step flow that creates a user + organization and sends activation emails
- **Admin panel** — User listing, activation/deactivation, newsletter management
- **Blockchain badges** — Solidity smart contract for minting achievement badges on Ethereum
- **Email integration** — Transactional emails via Mailgun, newsletter subscriptions via Mailchimp, MJML templates
- **API documentation** — Auto-generated Swagger UI at `/documentation`

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Hapi.js](https://hapi.dev/) v18 |
| Runtime | Node.js v10.15 |
| Database | PostgreSQL with [Sequelize](https://sequelize.org/) v5 ORM |
| Auth | JWT ([hapi-auth-jwt2](https://github.com/dwyl/hapi-auth-jwt2)) + bcrypt |
| Email | Mailgun, Mailchimp, MJML |
| Blockchain | Solidity 0.5 / Truffle / Ganache |
| Docs | [hapi-swagger](https://github.com/glennjones/hapi-swagger) |
| Testing | Jest + StandardJS |
| Build | Webpack, Babel, Nodemon |

## Project Structure

```
topia-api/
├── config/             # Database and app configuration
├── migrations/         # Sequelize database migrations
├── models/             # Sequelize models (User, Organisation, Project, SDG, TPI, etc.)
├── routes/             # Hapi route definitions
│   └── admin/          # Admin-only endpoints
├── seeders/            # Database seed data
├── services/           # Business logic layer
├── templates/          # MJML email templates
├── truffle/            # Ethereum smart contracts and Truffle config
│   └── contracts/      # Badge.sol
├── server.js           # Hapi server setup, plugin registration, auth strategy
└── index.js            # Entry point
```

## Data Model

```
User ←→ Organisation (many-to-many via OrganisationUser with roles)
Organisation → Project (one-to-many)
Project ←→ SDG Target (many-to-many via ProjectSdgTarget)
SDG → SDG Target → SDG Indicator
Project → TPI → TPI Data (indicator measurements over time)
Organisation → KPI
```

## API Endpoints

### Authentication
| Method | Path | Description |
|---|---|---|
| `POST` | `/user/register` | Register a new user |
| `POST` | `/user/login` | Log in and receive a JWT |
| `POST` | `/oauth/facebook` | Facebook OAuth login |
| `PUT` | `/user/password` | Reset password via token |

### Users
| Method | Path | Description |
|---|---|---|
| `GET` | `/user` | Get authenticated user profile |
| `PUT` | `/user` | Update profile (name, avatar, banner, social links) |
| `GET` | `/user/organizations` | List user's organizations |
| `GET` | `/user/projects` | List user's projects |

### Organisations
| Method | Path | Description |
|---|---|---|
| `GET` | `/organisations` | List all organisations |
| `GET` | `/organisations/{id}` | Get organisation details |
| `POST` | `/organisations` | Create an organisation |
| `PUT` | `/organisations/{id}` | Update an organisation |
| `DELETE` | `/organisations/{id}` | Delete an organisation |
| `POST` | `/organisations/{id}/users` | Add a user to an organisation |
| `DELETE` | `/organisations/{id}/users` | Remove a user from an organisation |
| `POST` | `/organisations/{id}/projects` | Create a project under an organisation |
| `GET` | `/organisations/{id}/projects` | List projects for an organisation |

### Projects
| Method | Path | Description |
|---|---|---|
| `GET` | `/projects` | List all projects |
| `GET` | `/projects/{id}` | Get project details |
| `PUT` | `/projects/{id}` | Update a project |
| `DELETE` | `/projects/{id}` | Delete a project |

### SDGs & Indicators
| Method | Path | Description |
|---|---|---|
| `GET` | `/sdg_targets` | List all SDG targets with parent goals |

### Other
| Method | Path | Description |
|---|---|---|
| `POST` | `/newsletter` | Subscribe to newsletter |
| `POST` | `/ngo` | Onboard a new NGO (creates user + organisation) |

### Admin (requires admin scope)
| Method | Path | Description |
|---|---|---|
| `GET` | `/admin/users` | List all users |
| `GET` | `/admin/user/{id}` | Get user details |
| `PUT` | `/admin/user/{id}/activate` | Activate a user account |

## Getting Started

### Prerequisites

- Node.js v10.15.0
- PostgreSQL
- npm

### Installation

```bash
# Install dependencies
npm install

# Create database config from example
cp ./config/config.json.example ./config/config.json

# Edit config with your PostgreSQL credentials
# Then create and migrate the database
npx sequelize db:create
npx sequelize db:migrate

# Seed with sample data (optional)
npx sequelize db:seed:all

# Start the dev server
npm start
```

The API will be available at `http://localhost:3000` and Swagger docs at `http://localhost:3000/documentation`.

### Environment Configuration

Copy the example config and provide your own values for:

- PostgreSQL connection credentials
- JWT secret
- Mailgun API key and domain
- Mailchimp API key
- Facebook OAuth app ID and secret

## Testing

```bash
# Run linter (StandardJS) and tests (Jest)
npm test

# Run only the linter
npm run lint
```

The test script automatically creates a fresh test database before running.

## Production Build

```bash
npm run build
node dist/bundle.js
```

## Ethereum / Blockchain Setup

The `truffle/` directory contains a Solidity smart contract (`Badge.sol`) for minting on-chain achievement badges.

```bash
# Install tools globally
npm install -g ganache-cli truffle

# Start a local Ethereum node
cd truffle
ganache-cli -p 7575 -i 5777 --db ./ganache_db -d

# Compile and deploy contracts
truffle compile
truffle migrate --reset

# Run contract tests
truffle test
```

## Sequelize CLI Reference

```bash
npx sequelize db:migrate              # Run pending migrations
npx sequelize db:migrate:undo         # Revert last migration
npx sequelize db:migrate:undo:all     # Revert all migrations
npx sequelize db:migrate:status       # Show migration status
npx sequelize db:seed:all             # Run all seeders
npx sequelize db:seed:undo:all        # Undo all seeders
npx sequelize migration:generate      # Generate a new migration file
npx sequelize model:generate          # Generate a model and migration
npx sequelize seed:generate           # Generate a new seed file
```

## License

MIT
