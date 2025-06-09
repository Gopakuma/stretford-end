import { Sequelize } from 'sequelize';
import config from 'config';
import { Tdb } from '../Types/CommonTypes.js';

const db: Tdb = config.get('database');
const { name, user, password, host, port } = db;

export const sequelize = new Sequelize(
  name,   // Database name
  user,   // Database user
  password, // Database password
  {
    host: host,
    port: port,
    dialect: 'mssql',
    logging: true // SQL query logging in console
  }
);