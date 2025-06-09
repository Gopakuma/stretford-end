import express from 'express';
import { sequelize } from './Database/DB.js';
import config from 'config';
import { Tserver } from './Types/CommonTypes.js'
import { Router } from "express";
import Routes from './src/Routes/Router.js';

const server: Tserver = config.get('server');
const { port } = server;

const app = express();

//middlewares
app.use(express.json());

//Setup Routes
const router = Router();
app.use(new Routes(router).router);

// Test database connection
(async function initialize() {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // Creates tables if they don't exist
    console.log('Connected to MSSQL database');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
})();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
})

export default app;