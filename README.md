## Getting started

### Install dependencies
```bash
npm install
```

### Set up PostgreSQL
- Create a PostgreSQL database.
- Update your .env file with the variables provided in `.env.example`

### Run migrations
```bash
knex migrate:latest
```

### Run tests
```bash
npm run test
```

### Start the app
```bash
npm run dev
```

### Tech Stack
- Node.js
- Express
- TypeScript
- Knex.js 
- PostgreSQL
- Mocha + Chai + Sinon
- Factory Girl