const axios = require('axios');
const cheerio = require('cheerio');
const storeUrl = process.env.STORE_URL;

export const parseStore = async () => {
  try {
    const response = await axios.get(storeUrl);
    const $ = cheerio.load(response.data);
    const items = [];

    $('li.s-item').each((index, element) => {
      const title = $(element).find('h3.s-item__title').text().trim();
      const price = $(element).find('span.s-item__price').text().trim();
      const shipping = $(element).find('span.s-item__shipping.s-item__logisticsCost').text().trim();
      const itemUrl = $(element).find('a.s-item__link').attr('href');

      items.push({
        title,
        price,
        shipping,
        itemUrl
      });
    });

    return items;
  } catch (error) {
    console.error('Error fetching the eBay store:', error);
    return [];
  }
};