import TelegramBot from 'node-telegram-bot-api';
import * as dotenv from 'dotenv';
import * as cron from 'node-cron';
import VNIndexService from './VNIndex.service';
import { IVNIndexSummary } from '../types/chartData.interface';

// Load environment variables early
dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN || '';

// Memory store
let bot: TelegramBot | null = null;
const activeUsers = new Set<number>();

const sendVNIndexUpdate = async (chatId: number) => {
  const response = await VNIndexService.getValueVNIndex();

  if (!response || !response.data) {
    bot?.sendMessage(
      chatId,
      '❌ Could not fetch VN-INDEX data at this moment.',
    );
    return;
  }

  const data: IVNIndexSummary = response.data;
  const { close, netChange, pctChange, changeRange } = data;

  const trendIcon = netChange >= 0 ? '📈' : '📉';
  const statusEmoji = netChange >= 0 ? '🟢' : '🔴';

  const prettyMessage = `
📊 *VN-INDEX SUMMARY* ${statusEmoji}

💰 *Current:* \`${close.toLocaleString()}\`
${trendIcon} *Change:* \`${netChange > 0 ? '+' : ''}${netChange.toFixed(2)}\` (\`${pctChange.toFixed(2)}%\`)

🕒 *Historical Performance:*
• 7 Days: \`${changeRange['7d'] > 0 ? '+' : ''}${changeRange['7d'].toFixed(2)}%\`
• 30 Days: \`${changeRange['30d'] > 0 ? '+' : ''}${changeRange['30d'].toFixed(2)}%\`
• YTD: \`${changeRange.ytd > 0 ? '+' : ''}${changeRange.ytd.toFixed(2)}%\`
• 1 Year: \`${changeRange['1y'] > 0 ? '+' : ''}${changeRange['1y'].toFixed(2)}%\`

_Data provided by Simplize_
  `.trim();

  bot?.sendMessage(chatId, prettyMessage, { parse_mode: 'Markdown' });
};

if (token) {
  // Create a resilient bot that polls Telegram's servers
  bot = new TelegramBot(token, { polling: true });

  // Handle errors
  bot.on('polling_error', (error) => {
    console.error('Telegram Polling Error:', error);
  });

  // Register commands to the bot menu
  bot.setMyCommands([
    { command: 'start', description: 'Start the bot' },
    { command: 'info', description: 'Get latest VN-INDEX summary' },
  ]);

  // Simple command listening
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    activeUsers.add(chatId);
    console.log({ activeUsers });
    bot?.sendMessage(
      chatId,
      'Welcome! I can provide you with the latest VN-INDEX market data.\n\nClick the button below or use /info to get started!',
      {
        reply_markup: {
          keyboard: [[{ text: 'VNIndex Info' }]],
          resize_keyboard: true,
          one_time_keyboard: false,
        },
      },
    );
  });

  // Handle both /info and "VNIndex Info" button
  bot.onText(/\/info|^VNIndex Info$/, async (msg) => {
    const chatId = msg.chat.id;
    activeUsers.add(chatId); // Auto-add to daily update list
    await sendVNIndexUpdate(chatId);
  });

  /**
   * Schedule daily report at 6:00 AM
   */
  cron.schedule('0 6 * * *', async () => {
    console.log('>> Executing scheduled daily VN-INDEX update...');
    for (const chatId of activeUsers) {
      await sendVNIndexUpdate(chatId);
    }
  });

  // Generic message listening fallback
  bot.on('message', (msg) => {
    if (msg.text?.startsWith('/') || msg.text === 'VNIndex Info') return;
    bot?.sendMessage(msg.chat.id, `You said: "${msg.text}". Ready to assist!`);
  });

  console.log('>> Telegram Bot successfully initialized and polling...');
} else {
  console.warn(
    '!! No TELEGRAM_BOT_TOKEN found in environment. Telegram bot is offline. !!',
  );
}

export default bot;
