import knex from 'knex';
import config from '../knexfile';
import dotenv from 'dotenv';

dotenv.config();
export const db = knex(config.development);

export const connectDB =  async () => {
 try {
  await db.raw('SELECT 1+1 AS result');
  console.log('Connected to PostgreSQL');
 } catch (error) {
  console.log('Connection failed', error);
 }
};