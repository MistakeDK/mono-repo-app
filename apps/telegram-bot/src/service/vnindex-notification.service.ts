import TelegramBot from 'node-telegram-bot-api';
import * as cron from 'node-cron';
import { DEFAULT_NOTIFY_TIME } from '../constants/vnindex-notification.constant';
import { IVNIndexSummary } from '../types/chartData.interface';
import { getVietnamDateTimeParts, isValidNotifyTime } from '../utils/common';
import {
  createOrUpdateUserInfo,
  getUserInfoByCondition,
} from './supabase.service';
import VNIndexService from './vnindex.service';

const formatSignedPercent = (value: number) =>
  `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;

const formatVNIndexSummaryMessage = (data: IVNIndexSummary) => {
  const { close, netChange, pctChange, changeRange } = data;
  const trendText = netChange >= 0 ? 'Up' : 'Down';
  const statusText = netChange >= 0 ? 'Positive' : 'Negative';

  return `
*VN-INDEX SUMMARY* (${statusText})

*Current:* \`${close.toLocaleString()}\`
${trendText} *Change:* \`${netChange > 0 ? '+' : ''}${netChange.toFixed(2)}\` (\`${pctChange.toFixed(2)}%\`)

*Historical Performance:*
- 7 Days: \`${formatSignedPercent(changeRange['7d'])}\`
- 30 Days: \`${formatSignedPercent(changeRange['30d'])}\`
- YTD: \`${formatSignedPercent(changeRange.ytd)}\`
- 1 Year: \`${formatSignedPercent(changeRange['1y'])}\`

_Data provided by Simplize_
  `.trim();
};

export const sendVNIndexUpdate = async (bot: TelegramBot, chatId: number) => {
  const response = await VNIndexService.getValueVNIndex();

  if (!response || !response.data) {
    await bot.sendMessage(
      chatId,
      'Could not fetch VN-INDEX data at this moment.',
    );
    return;
  }

  await bot.sendMessage(chatId, formatVNIndexSummaryMessage(response.data), {
    parse_mode: 'Markdown',
  });
};

export const scheduleVNIndexNotifications = (bot: TelegramBot) => {
  cron.schedule('0 * * * * *', async () => {
    const { date, time } = getVietnamDateTimeParts();
    console.log(`>> Checking VN-INDEX notifications for ${time}...`);

    const users = await getUserInfoByCondition(
      'userInfo->isRegisterGetInfo',
      true,
    );

    const usersToNotify = (users || []).filter((user) => {
      const userInfo = user.userInfo || {};
      const notifyTime = isValidNotifyTime(userInfo.notifyTime)
        ? userInfo.notifyTime
        : DEFAULT_NOTIFY_TIME;

      return notifyTime === time && userInfo.lastVNIndexInfoSentDate !== date;
    });

    if (usersToNotify.length === 0) return;

    console.log(
      `>> Sending updates to ${usersToNotify.length} registered users...`,
    );

    await Promise.all(
      usersToNotify.map(async (user) => {
        await sendVNIndexUpdate(bot, user.id);
        await createOrUpdateUserInfo(user.id, {
          lastVNIndexInfoSentDate: date,
        });
      }),
    );
  });
};
