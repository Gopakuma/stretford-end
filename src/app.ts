import express from 'express';
import { sequelize } from './Database/DB.js';
import { Router } from "express";
import Routes from './Routes/Router.js';
import cors from 'cors';
import Squad from './Database/models/Squad.js';
import User from './Database/models/User.js';
import Matchday from './Database/models/Matchday.js';
import kafka from './kafka/kafka.js';
import http from 'http';
import { WebSocket, WebSocketServer } from 'ws';

const app = express();

//middlewares
app.use(express.json());

// Allow CORS for all origins
app.use(cors());

// Handle preflight requests manually
app.options("*", cors()); // Respond to OPTIONS requests


//Setup Routes
const router = Router();
app.use(new Routes(router).router);

const server = http.createServer(app);
export const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('New WebSocket client connected');

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });

  // Optional: Send initial message
  ws.send(JSON.stringify({
    sender: 'System',
    content: 'Connected to chat server',
    timestamp: new Date().toISOString()
  }));
});

const kafkaBroker = new kafka();
kafkaBroker.setWebSocketServer(wss);

app.post('/message', async (req, res) => {
  const { sender, content, group = 'community' } = req.body;
  if (!sender || !content) {
    res.status(400).send('Missing required fields');
  }
  await kafkaBroker.sendMessage(sender, content, group);
  res.status(200).send('Message queued');
});

// Test database connection
(async function initialize() {
  try {
    await sequelize.authenticate();

    await User.sync();
    await Squad.sync();
    await Matchday.sync();

    await kafkaBroker.connect();
    console.log('Kafka connected');

    console.log('Connected to MSSQL database');
    server.listen(3000, () => console.log('Server running on port 3000'));
  } catch (error) {
    console.error('Database connection failed:', error);
  }
})();

process.on('SIGINT', async () => {
  await kafkaBroker.disconnect();
  await sequelize.close();
  process.exit();
});

process.on('SIGTERM', async () => {
  await kafkaBroker.disconnect();
  await sequelize.close();
  process.exit();
});

export default app;