const TelegramBot = require('node-telegram-bot-api');
const botToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;
const MAX_MESSAGE_LENGTH = 4096;

const bot = new TelegramBot(botToken, { polling: true });

const sendNewItemsToTelegram = (newItems, category) => {
  if (newItems.length === 0) return;

  const message = `${newItems.length} new items in ${category.toUpperCase()} listed:\n\n` + newItems.map(item => `${item.title}\nPrice: ${item.price}\nLink: ${item.link}`).join('\n\n');
  const sendChunks = async (chatId, message) => {
    const chunks = [];
    for (let i = 0; i < message.length; i += MAX_MESSAGE_LENGTH) {
      chunks.push(message.slice(i, i + MAX_MESSAGE_LENGTH));
    }

    for (const chunk of chunks) {
      try {
        await bot.sendMessage(chatId, chunk);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  sendChunks(chatId, message);
};

module.exports = { sendNewItemsToTelegram };