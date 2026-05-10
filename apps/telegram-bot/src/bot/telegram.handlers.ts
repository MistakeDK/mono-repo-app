import TelegramBot from 'node-telegram-bot-api';
import { createOrUpdateUserInfo } from '../service/supabase.service';
import { sendVNIndexUpdate } from '../service/vnindex-notification.service';
import { DEFAULT_NOTIFY_TIME } from '../constants/vnindex-notification.constant';
import { isValidNotifyTime } from '../utils/common';
import {
  KNOWN_BUTTON_TEXT,
  VNINDEX_NOTIFY_TIME_PREFIX,
  buildMainMenuKeyboard,
  buildNotifyTimeKeyboard,
} from './telegram.keyboards';

export const showStartMenu = async (bot: TelegramBot, chatId: number) => {
  await bot.sendMessage(
    chatId,
    'Welcome! I can provide you with the latest VN-INDEX market data.\n\nClick the button below or use /info to get started!',
    {
      reply_markup: buildMainMenuKeyboard(),
    },
  );
};

export const showNotifyTimeOptions = async (
  bot: TelegramBot,
  chatId: number,
) => {
  await bot.sendMessage(
    chatId,
    'Choose your daily VN-INDEX notification time:',
    {
      reply_markup: buildNotifyTimeKeyboard(),
    },
  );
};

export const sendLatestVNIndexInfo = async (
  bot: TelegramBot,
  chatId: number,
) => {
  await sendVNIndexUpdate(bot, chatId);
};

export const registerForVNIndexUpdates = async (
  bot: TelegramBot,
  chatId: number,
) => {
  await createOrUpdateUserInfo(chatId, {
    isRegisterGetInfo: true,
    notifyTime: DEFAULT_NOTIFY_TIME,
  });

  await bot.sendMessage(
    chatId,
    `Success! You have registered for daily VN-INDEX updates at ${DEFAULT_NOTIFY_TIME}.\n\nChoose another time below if you prefer:`,
    {
      reply_markup: buildNotifyTimeKeyboard(),
    },
  );
};

export const unregisterFromVNIndexUpdates = async (
  bot: TelegramBot,
  chatId: number,
) => {
  await createOrUpdateUserInfo(chatId, { isRegisterGetInfo: false });

  await bot.sendMessage(
    chatId,
    'You have unregistered from daily VN-INDEX updates.',
  );
};

export const handleNotifyTimeCallback = async (
  bot: TelegramBot,
  query: TelegramBot.CallbackQuery,
) => {
  const chatId = query.message?.chat.id;
  const selectedTime = query.data?.replace(VNINDEX_NOTIFY_TIME_PREFIX, '');

  if (
    !chatId ||
    !query.data?.startsWith(VNINDEX_NOTIFY_TIME_PREFIX) ||
    !isValidNotifyTime(selectedTime)
  ) {
    return;
  }

  await createOrUpdateUserInfo(chatId, {
    isRegisterGetInfo: true,
    notifyTime: selectedTime,
  });

  await bot.answerCallbackQuery(query.id, {
    text: `Notification time set to ${selectedTime}`,
  });
  await bot.sendMessage(
    chatId,
    `Your daily VN-INDEX notification time is now ${selectedTime}.`,
  );
};

export const handleFallbackMessage = async (
  bot: TelegramBot,
  msg: TelegramBot.Message,
) => {
  if (msg.text?.startsWith('/') || KNOWN_BUTTON_TEXT.has(msg.text || '')) {
    return;
  }

  await bot.sendMessage(
    msg.chat.id,
    `You said: "${msg.text}". Ready to assist!`,
  );
};
