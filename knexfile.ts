import dotenv from 'dotenv';
dotenv.config();


export default {
 development: {
  client: 'postgresql',
  connection: {
   host: 'localhost',
   database: process.env.DB_NAME,
   user: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
  },
  pool: {
   min: 2,
   max: 10
  },
  migrations: {
   tableName: 'knex_migrations',
   directory: './database/migrations'
  }
 }
};
