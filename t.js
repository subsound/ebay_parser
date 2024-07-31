const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeEBayItems(url) {
  try {
    const response = await axios.get(url);
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

    const data = JSON.stringify(items, null, 2);
    fs.writeFileSync('items.json', data);

    console.log(`Scraped ${items.length} items from ${url}`);
  } catch (error) {
    console.error(error);
  }
}

scrapeEBayItems('https://www.ebay.com/sch/i.html?_nkw=iphone');