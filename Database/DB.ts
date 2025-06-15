import { Sequelize } from 'sequelize';
import config from 'config';
import { Tdb } from '../Types/CommonTypes.js';
import winston from "winston";

const db: Tdb = config.get('database');
const { name, user, password, host, port } = db;

const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "database.log" }) // Save logs to a file
  ]
});


export const sequelize = new Sequelize(
  name,   // Database name
  user,   // Database user
  password, // Database password
  {
    host: host,
    port: port,
    dialect: 'mssql',
    logging: (msg) => logger.info(msg) // SQL query logging in console
  }
);