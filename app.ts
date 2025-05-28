import express from 'express';
import { sequelize } from './Database/DB.js';
const app = express();
const port = 3000;

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


app.get('/', (req, res) => {
    res.send('Hello World!');
});
//


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})

export default app;