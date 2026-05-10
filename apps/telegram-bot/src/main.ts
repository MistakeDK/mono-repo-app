/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import { notifyVNIndex } from './controller/vnindex.controller';
import { initTelegramBot } from './bot/telegram.bot';

const app = express();

initTelegramBot();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api/getVNIndex', notifyVNIndex);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
