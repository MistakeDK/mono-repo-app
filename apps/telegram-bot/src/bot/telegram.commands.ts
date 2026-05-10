import TelegramBot from 'node-telegram-bot-api';
import { TELEGRAM_BUTTON_TEXT } from './telegram.keyboards';
import {
  handleFallbackMessage,
  handleNotifyTimeCallback,
  registerForVNIndexUpdates,
  sendLatestVNIndexInfo,
  showNotifyTimeOptions,
  showStartMenu,
  unregisterFromVNIndexUpdates,
} from './telegram.handlers';

export const registerTelegramCommands = (bot: TelegramBot) => {
  bot.setMyCommands([
    { command: 'start', description: 'Start the bot' },
    { command: 'info', description: 'Get latest VN-INDEX summary' },
    {
      command: 'notifytime',
      description: 'Set daily VN-INDEX notification time',
    },
  ]);

  bot.onText(/^\/start$/, async (msg) => {
    await showStartMenu(bot, msg.chat.id);
  });

  bot.onText(
    new RegExp(`^/info$|^${TELEGRAM_BUTTON_TEXT.vnindexInfo}$`),
    async (msg) => {
      await sendLatestVNIndexInfo(bot, msg.chat.id);
    },
  );

  bot.onText(
    new RegExp(`^${TELEGRAM_BUTTON_TEXT.registerVNIndexInfo}$`),
    async (msg) => {
      await registerForVNIndexUpdates(bot, msg.chat.id);
    },
  );

  bot.onText(
    new RegExp(`^/notifytime$|^${TELEGRAM_BUTTON_TEXT.setVNIndexNotifyTime}$`),
    async (msg) => {
      await showNotifyTimeOptions(bot, msg.chat.id);
    },
  );

  bot.onText(
    new RegExp(`^${TELEGRAM_BUTTON_TEXT.unregisterVNIndexInfo}$`),
    async (msg) => {
      await unregisterFromVNIndexUpdates(bot, msg.chat.id);
    },
  );

  bot.on('callback_query', async (query) => {
    await handleNotifyTimeCallback(bot, query);
  });

  bot.on('message', async (msg) => {
    await handleFallbackMessage(bot, msg);
  });
};
