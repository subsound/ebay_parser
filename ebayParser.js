const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const cron = require('node-cron');
const TelegramBot = require('node-telegram-bot-api');
const { env } = require('process');

const storeUrl = 'https://www.ebay.com/str/thegeex';
const jsonFileName = process.env.JSON_FILE_NAME || 'data/items.json';
const botToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

const bot = new TelegramBot(botToken, { polling: true });

const parseStore = async () => {
  try {
    const response = await axios.get(storeUrl);
    const $ = cheerio.load(response.data);
    const items = [];

    $('li.s-item').each((index, element) => {
      const title = $(element).find('.s-item__title').text().toLowerCase();
      const item = {
        title: $(element).find('.s-item__title').text(),
        price: $(element).find('.s-item__price').text(),
        link: $(element).find('.s-item__link').attr('href')
      };
      console.log(item);
      items.push(item);
    });

    return items;
  } catch (error) {
    console.error('Error fetching the eBay store:', error);
    return [];
  }
};

const saveItemsToFile = (items) => {
  fs.writeFileSync(jsonFileName, JSON.stringify(items, null, 2), 'utf-8');
};

const readItemsFromFile = () => {
  if (fs.existsSync(jsonFileName)) {
    const data = fs.readFileSync(jsonFileName, 'utf-8');
    return JSON.parse(data);
  }
  return [];
};

const sendNewItemsToTelegram = (newItems) => {
  newItems.forEach(item => {
    const message = `New item listed: ${item.title}\nPrice: ${item.price}\nLink: ${item.link}`;
    bot.sendMessage(chatId, message);
  });
};

const checkForNewListings = async () => {
  const oldItems = readItemsFromFile();
  const newItems = await parseStore();

  const oldItemsLinks = new Set(oldItems.map(item => item.link));
  const newlyListedItems = newItems.filter(item => !oldItemsLinks.has(item.link));

  if (newlyListedItems.length > 0) {
    saveItemsToFile(newItems);
    sendNewItemsToTelegram(newlyListedItems);
  }
};

// Initial run
checkForNewListings();

// Schedule to run every 30 minutes
cron.schedule('*/30 * * * *', () => {
  checkForNewListings();
});
