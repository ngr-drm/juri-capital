import pg from 'pg';
import config from '../../../config-env';

const { Pool } = pg;

export function pgPool() {
  return new Pool({
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    host: config.DB_HOST,
    database: config.DB_DATABASE,
    port: config.DB_PORT,
  });
}
