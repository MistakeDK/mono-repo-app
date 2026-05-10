import TelegramBot from 'node-telegram-bot-api';
import * as dotenv from 'dotenv';
import { scheduleVNIndexNotifications } from '../service/vnindex-notification.service';
import { registerTelegramCommands } from './telegram.commands';

let bot: TelegramBot | null = null;

export const initTelegramBot = () => {
  if (bot) {
    return bot;
  }

  dotenv.config();

  const token = process.env.TELEGRAM_BOT_TOKEN || '';

  if (!token) {
    console.warn(
      '!! No TELEGRAM_BOT_TOKEN found in environment. Telegram bot is offline. !!',
    );
    return bot;
  }

  bot = new TelegramBot(token, { polling: true });

  bot.on('polling_error', (error) => {
    console.error('Telegram Polling Error:', error);
  });

  registerTelegramCommands(bot);
  scheduleVNIndexNotifications(bot);

  console.log('>> Telegram Bot successfully initialized and polling...');
  return bot;
};
