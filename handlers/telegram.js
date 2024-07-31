const TelegramBot = require('node-telegram-bot-api');
const botToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

const bot = new TelegramBot(botToken, { polling: true });

export const sendNewItemsToTelegram = (newItems) => {
  newItems.forEach(item => {
    const message = `New item listed: ${item.title}\nPrice: ${item.price}\nLink: ${item.link}`;
    bot.sendMessage(chatId, message);
  });
};